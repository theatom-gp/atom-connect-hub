import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
// import { Client } from '@paypal/paypal-server-sdk'; // Will be used when PayPal is properly configured

// Type definitions for better type safety
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface RegistrationData {
  id: string;
  conferenceId: string;
  personalInfo: PersonalInfo;
  status: string;
  paymentStatus?: string;
  refundedAt?: admin.firestore.FieldValue | Date;
  paymentInfo?: {
    status: string;
    paypalRefundId?: string;
    refundAmount?: number;
    [key: string]: unknown;
  };
}

interface AbstractData {
  conferenceId: string;
  title: string;
  authors: string[];
  documentUrl: string;
  status: string;
}

interface PaymentData {
  id: string;
  idempotencyKey: string;
  registrationId: string;
  conferenceId: string;
  amount: number;
  currency: string;
  status: string;
  checkoutUrl?: string;
  paymentMethod: string;
  createdAt: admin.firestore.FieldValue | Date;
  paypalRefundId?: string;
  refundedAt?: admin.firestore.FieldValue | Date;
  refundAmount?: number;
  paymentDetails?: {
    status: string;
    paypalRefundId?: string;
    refundAmount?: number;
    [key: string]: unknown;
  };
}

interface UserDocument {
  email: string;
  personalInfo: PersonalInfo;
  registrations: RegistrationData[];
  abstracts: AbstractData[];
  payments: PaymentData[];
  totalSpent: number;
  totalRegistrations: number;
  totalAbstracts: number;
  createdAt: admin.firestore.FieldValue | Date;
  updatedAt: admin.firestore.FieldValue | Date;
}

interface PayPalCapture {
  id: string;
  status: string;
  amount: {
    currency_code: string;
    value: string;
  };
  custom_id?: string;
  custom_id_metadata?: {
    userEmail: string;
    conferenceId?: string;
  };
  [key: string]: unknown;
}

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
let stripe: Stripe | null = null;
try {
  const stripeConfig = functions.config().stripe;
  if (stripeConfig && stripeConfig.secret_key) {
    stripe = new Stripe(stripeConfig.secret_key, {
      apiVersion: '2023-10-16',
    });
    console.log('✅ Stripe initialized successfully');
  } else {
    console.log('⚠️ Stripe configuration not found - payment functions will be disabled');
  }
} catch (error) {
  console.log('⚠️ Failed to initialize Stripe:', error);
}

// Initialize PayPal - Placeholder for now
const paypalClient: unknown = null;
try {
  const paypalConfig = functions.config().paypal;
  if (paypalConfig && paypalConfig.client_id && paypalConfig.client_secret) {
    // TODO: Uncomment when PayPal SDK is properly configured
    // paypalClient = new Client({
    //   clientId: paypalConfig.client_id,
    //   clientSecret: paypalConfig.client_secret,
    //   environment: paypalConfig.environment || 'sandbox'
    // });
    console.log('✅ PayPal configuration found - will be enabled in production');
  } else {
    console.log('⚠️ PayPal configuration not found - PayPal functions will be disabled');
  }
} catch (error) {
  console.log('⚠️ Failed to initialize PayPal:', error);
}

// Initialize Firestore
const db = admin.firestore();

// CORS middleware
const corsHandler = (req: functions.Request, res: functions.Response, next: () => void) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  next();
};

// ===== OPTIMIZED USER MANAGEMENT =====

// Create or update user with all data in one document
export const createOrUpdateUser = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { email, personalInfo, registrationData, abstractData } = request.body;

      // Input validation
      if (!email || !personalInfo) {
        response.status(400).json({ error: 'Email and personal info are required' });
        return;
      }

      if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
        response.status(400).json({ error: 'First name, last name, and email are required' });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        response.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Use email as document ID for consistency
      const userRef = db.collection('users').doc(email);
      
      // Get existing user data
      const userDoc = await userRef.get();
      const existingUser = userDoc.exists ? userDoc.data() : null;

      // Prepare user data with embedded arrays
      const userData = {
        email,
        personalInfo,
        registrations: existingUser?.registrations || [],
        abstracts: existingUser?.abstracts || [],
        payments: existingUser?.payments || [],
        totalSpent: existingUser?.totalSpent || 0,
        totalRegistrations: existingUser?.totalRegistrations || 0,
        totalAbstracts: existingUser?.totalAbstracts || 0,
        createdAt: existingUser?.createdAt || admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Add new registration if provided
      if (registrationData) {
        const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newRegistration = {
          id: registrationId,
          ...registrationData,
          createdAt: new Date(), // Use Date instead of serverTimestamp for embedded arrays
          status: 'pending'
        };
        userData.registrations.push(newRegistration);
        userData.totalRegistrations = userData.registrations.length;
      }

      // Add new abstract if provided
      if (abstractData) {
        const abstractId = `abs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newAbstract = {
          id: abstractId,
          ...abstractData,
          submittedAt: new Date(), // Use Date instead of serverTimestamp for embedded arrays
          status: 'submitted'
        };
        userData.abstracts.push(newAbstract);
        userData.totalAbstracts = userData.abstracts.length;
      }

      // Save user document
      await userRef.set(userData);

      response.status(200).json({
        success: true,
        userId: email,
        message: 'User data saved successfully',
        registrationId: registrationData ? userData.registrations[userData.registrations.length - 1].id : null,
        abstractId: abstractData ? userData.abstracts[userData.abstracts.length - 1].id : null
      });
    } catch (error) {
      console.error('Error creating/updating user:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Get complete user data in single query
export const getUserData = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      // Extract email from URL path (e.g., /getUserData/user@example.com)
      const pathParts = request.path.split('/');
      const email = pathParts[pathParts.length - 1];

      if (!email) {
        console.error('❌ No email found in path');
        response.status(400).json({ error: 'Email is required' });
        return;
      }

      const userDoc = await db.collection('users').doc(email).get();

      if (!userDoc.exists) {
        response.status(404).json({ error: 'User not found' });
        return;
      }

      const userData = userDoc.data() as UserDocument;

      response.status(200).json({
        success: true,
        user: {
          id: userDoc.id,
          ...userData
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ===== OPTIMIZED CONFERENCE MANAGEMENT =====

// Get conferences with analytics
export const getConferences = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const snapshot = await db.collection('conferences')
        .where('isActive', '==', true)
        .orderBy('date', 'asc')
        .get();

      const conferences = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      response.status(200).json({
        success: true,
        conferences
      });
    } catch (error) {
      console.error('Error fetching conferences:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Update conference analytics (called when registrations/abstracts are added)
export const updateConferenceAnalytics = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { conferenceId, type, amount } = request.body; // type: 'registration' | 'abstract' | 'payment'

      if (!conferenceId || !type) {
        response.status(400).json({ error: 'Conference ID and type are required' });
        return;
      }

      const conferenceRef = db.collection('conferences').doc(conferenceId);
      const updateData: Record<string, unknown> = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      switch (type) {
        case 'registration':
          updateData.totalRegistrations = admin.firestore.FieldValue.increment(1);
          break;
        case 'abstract':
          updateData.totalAbstracts = admin.firestore.FieldValue.increment(1);
          break;
        case 'payment':
          updateData.totalRevenue = admin.firestore.FieldValue.increment(amount || 0);
          break;
      }

      await conferenceRef.update(updateData);

      response.status(200).json({
        success: true,
        message: 'Conference analytics updated successfully'
      });
    } catch (error) {
      console.error('Error updating conference analytics:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ===== OPTIMIZED PAYMENT PROCESSING =====

// Create Stripe checkout session with optimized data handling
export const createStripeCheckoutSession = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { 
      amount, 
      userEmail, 
      conferenceId, 
      registrationId,
      currency = 'usd', 
      metadata, 
      idempotencyKey,
      successUrl,
      cancelUrl
    } = req.body;

    if (!amount || !userEmail || !conferenceId || !registrationId || !successUrl || !cancelUrl) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    const headerIdempotencyKey = req.headers['idempotency-key'] as string;
    const finalIdempotencyKey = idempotencyKey || headerIdempotencyKey;

    if (!finalIdempotencyKey) {
      res.status(400).json({ success: false, error: 'Idempotency key is required' });
      return;
    }

    // Check if payment already exists in user document
    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data() as UserDocument;
      const existingPayment = userData?.payments?.find((p: PaymentData) => p.idempotencyKey === finalIdempotencyKey);
      
      if (existingPayment) {
        res.json({
          success: true,
          checkoutSession: {
            id: existingPayment.id,
            url: existingPayment.checkoutUrl,
            status: existingPayment.status,
            amount: existingPayment.amount,
            currency: existingPayment.currency
          },
          isExisting: true,
          message: 'Checkout session already exists'
        });
        return;
      }
    }

    if (!stripe) {
      res.status(503).json({ 
        success: false, 
        error: 'Payment processing is not configured' 
      });
      return;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: currency,
          product_data: {
            name: `Conference Registration`,
            description: `Registration for conference`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        ...metadata,
        idempotencyKey: finalIdempotencyKey,
        userEmail,
        conferenceId,
        registrationId
      },
      customer_email: userEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    }, {
      idempotencyKey: finalIdempotencyKey
    });

    // Store payment info in user document
    const paymentData = {
      id: session.id,
      idempotencyKey: finalIdempotencyKey,
      registrationId,
      conferenceId,
      amount: amount,
      currency: currency,
      status: 'pending',
      checkoutUrl: session.url,
      paymentMethod: 'stripe',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    await userRef.update({
      payments: admin.firestore.FieldValue.arrayUnion(paymentData),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    res.json({
        success: true,
      checkoutSession: {
        id: session.id,
        url: session.url,
        status: session.status,
        amount: session.amount_total,
        currency: session.currency
      },
      idempotencyKey: finalIdempotencyKey,
      isExisting: false
      });
    } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    
    // Handle Stripe-specific errors
    if (error instanceof Error) {
      if (error.message.includes('idempotency')) {
        res.status(409).json({ 
          success: false, 
          error: 'Checkout session with this idempotency key already exists',
          code: 'IDEMPOTENCY_CONFLICT'
        });
        return;
      }
      
      if (error.message.includes('card_error')) {
        res.status(400).json({ 
          success: false, 
          error: 'Card payment failed',
          code: 'CARD_ERROR'
        });
        return;
      }
      
      if (error.message.includes('rate_limit')) {
        res.status(429).json({ 
          success: false, 
          error: 'Too many requests, please try again later',
          code: 'RATE_LIMIT'
        });
        return;
      }
    }
    
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// ===== OPTIMIZED PAYPAL PAYMENT PROCESSING =====

// Create PayPal order with optimized data handling
export const createPayPalOrder = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
        return;
      }

  try {
    const { 
        amount,
      userEmail, 
      conferenceId, 
      registrationId,
 
      idempotencyKey,
      returnUrl,
      cancelUrl
    } = req.body;

    if (!amount || !userEmail || !conferenceId || !registrationId || !returnUrl || !cancelUrl) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    const headerIdempotencyKey = req.headers['idempotency-key'] as string;
    const finalIdempotencyKey = idempotencyKey || headerIdempotencyKey;

    if (!finalIdempotencyKey) {
      res.status(400).json({ success: false, error: 'Idempotency key is required' });
      return;
    }

    // Check if payment already exists in user document
    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      // const userData = userDoc.data() as UserDocument;
      const existingPayment = userData?.payments?.find((p: PaymentData) => p.idempotencyKey === finalIdempotencyKey);
      
      if (existingPayment) {
        res.json({
        success: true,
          order: {
            id: existingPayment.id,
            status: existingPayment.status,
            intent: existingPayment.intent,
            approvalUrl: existingPayment.approvalUrl
          },
          isExisting: true,
          message: 'PayPal order already exists with this idempotency key'
        });
        return;
      }
    }

    // Check if PayPal is initialized
    if (!paypalClient) {
      res.status(503).json({ 
        success: false, 
        error: 'PayPal integration is not configured. Please contact support.' 
      });
      return;
    }

    // TODO: Implement actual PayPal order creation when SDK is configured
    // For now, return a placeholder response
    res.status(500).json({ 
      success: false, 
      error: 'PayPal integration needs to be updated for production deployment. Please use Stripe for now.' 
    });
    return;

    } catch (error) {
    console.error('Error creating PayPal order:', error);
    
    // Handle PayPal-specific errors
    if (error instanceof Error) {
      if (error.message.includes('idempotency')) {
        res.status(409).json({ 
          success: false, 
          error: 'PayPal order with this idempotency key already exists',
          code: 'IDEMPOTENCY_CONFLICT'
        });
        return;
      }
      
      if (error.message.includes('INVALID_REQUEST')) {
        res.status(400).json({ 
          success: false, 
          error: 'Invalid PayPal request parameters',
          code: 'INVALID_REQUEST'
        });
        return;
      }
      
      if (error.message.includes('UNAUTHORIZED')) {
        res.status(401).json({ 
          success: false, 
          error: 'PayPal authentication failed',
          code: 'UNAUTHORIZED'
        });
        return;
      }
    }
    
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown PayPal error' 
    });
  }
});

// ===== OPTIMIZED WEBHOOK HANDLING =====

// Stripe webhook with optimized user updates
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (!stripe) {
    res.status(503).json({ error: 'Payment processing is not configured' });
    return;
  }

  const sig = req.headers['stripe-signature'];
  const endpointSecret = functions.config().stripe?.webhook_secret;

  if (!endpointSecret) {
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig!, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).send(`Webhook Error: ${errorMessage}`);
    return;
  }

  try {
    // Check if event already processed
    const eventId = event.id;
    const eventProcessedQuery = db.collection('webhookEvents')
      .where('stripeEventId', '==', eventId)
      .limit(1);
    
    const eventProcessedSnapshot = await eventProcessedQuery.get();
    if (!eventProcessedSnapshot.empty) {
      console.log(`Webhook event ${eventId} already processed, skipping`);
      res.json({ received: true, message: 'Event already processed' });
      return;
    }

    // Mark event as being processed
    await db.collection('webhookEvents').add({
      stripeEventId: eventId,
      eventType: event.type,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'processing'
    });

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handleOptimizedPaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handleOptimizedPaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as completed
    await db.collection('webhookEvents').add({
      stripeEventId: eventId,
      eventType: event.type,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed'
    });

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    if (event?.id) {
      await db.collection('webhookEvents').add({
        stripeEventId: event.id,
        eventType: event.type,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// PayPal webhook handler with optimized user updates
export const paypalWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const event = req.body;
    
    // Verify PayPal webhook signature (implement when PayPal SDK is configured)
    // TODO: Add PayPal webhook signature verification
    
    // Check if event already processed
    const eventId = event.id || event.event_id;
    if (eventId) {
      const eventProcessedQuery = db.collection('webhookEvents')
        .where('paypalEventId', '==', eventId)
        .limit(1);
      
      const eventProcessedSnapshot = await eventProcessedQuery.get();
      if (!eventProcessedSnapshot.empty) {
        console.log(`PayPal webhook event ${eventId} already processed, skipping`);
        res.json({ received: true, message: 'Event already processed' });
        return;
      }

      // Mark event as being processed
      await db.collection('webhookEvents').add({
        paypalEventId: eventId,
        eventType: event.event_type,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'processing'
      });
    }
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handleOptimizedPayPalPaymentSuccess(event.resource);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handleOptimizedPayPalPaymentFailure(event.resource);
        break;
      case 'PAYMENT.CAPTURE.REFUNDED':
        await handleOptimizedPayPalPaymentRefund(event.resource);
        break;
      default:
        console.log(`Unhandled PayPal event: ${event.event_type}`);
    }

    // Mark event as completed
    if (eventId) {
      await db.collection('webhookEvents').add({
        paypalEventId: eventId,
        eventType: event.event_type,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'completed'
      });
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    
    // Mark event as failed
    const eventId = req.body?.id || req.body?.event_id;
    if (eventId) {
      await db.collection('webhookEvents').add({
        paypalEventId: eventId,
        eventType: req.body?.event_type,
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    res.status(500).json({ error: 'PayPal webhook processing failed' });
  }
});

// ===== OPTIMIZED WEBHOOK HANDLERS =====

async function handleOptimizedPaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { userEmail, conferenceId, registrationId } = paymentIntent.metadata;
    
    if (!userEmail || !registrationId) {
      console.error('Missing required metadata in payment intent');
      return;
    }

    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.error(`User ${userEmail} not found`);
      return;
    }

    const userData = userDoc.data() as UserDocument;
    
    if (!userData) {
      console.error(`User data not found for ${userEmail}`);
      return;
    }
    
    // Update payment status in user document
    const updatedPayments = userData.payments.map((payment: PaymentData) => {
      if (payment.id === paymentIntent.id) {
        return {
          ...payment,
          status: 'succeeded',
          stripePaymentIntentId: paymentIntent.id,
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentDetails: {
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'succeeded'
          }
        };
      }
      return payment;
    });

    // Update registration status
    const updatedRegistrations = userData.registrations.map((registration: RegistrationData) => {
      if (registration.id === registrationId) {
        return {
          ...registration,
          status: 'paid',
          paymentStatus: 'completed',
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentInfo: {
          stripePaymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'succeeded',
            paymentMethod: 'stripe'
          }
        };
      }
      return registration;
    });

    // Calculate total spent
    const totalSpent = updatedPayments
      .filter((p: PaymentData) => p.status === 'succeeded')
      .reduce((sum: number, p: PaymentData) => sum + (p.amount || 0), 0);

    // Update user document with all changes
    await userRef.update({
      payments: updatedPayments,
      registrations: updatedRegistrations,
      totalSpent: totalSpent,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    // Update conference analytics
    if (conferenceId) {
      await db.collection('conferences').doc(conferenceId).update({
        totalRevenue: admin.firestore.FieldValue.increment(paymentIntent.amount / 100),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    console.log(`Payment succeeded for user: ${userEmail}, registration: ${registrationId}`);
    } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handleOptimizedPaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { userEmail, registrationId } = paymentIntent.metadata;
    
    if (!userEmail || !registrationId) {
      console.error('Missing required metadata in payment intent');
      return;
    }

    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.error(`User ${userEmail} not found`);
      return;
    }

    const userData = userDoc.data() as UserDocument;
    
    if (!userData) {
      console.error(`User data not found for ${userEmail}`);
      return;
    }
    
    // Update payment status in user document
    const updatedPayments = userData.payments.map((payment: PaymentData) => {
      if (payment.id === paymentIntent.id) {
        return {
          ...payment,
          status: 'failed',
          stripePaymentIntentId: paymentIntent.id,
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          failureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
          paymentDetails: {
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'failed'
          }
        };
      }
      return payment;
    });

    // Update registration status
    const updatedRegistrations = userData.registrations.map((registration: RegistrationData) => {
      if (registration.id === registrationId) {
        return {
          ...registration,
          status: 'payment_failed',
          paymentStatus: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentInfo: {
            stripePaymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'failed',
            paymentMethod: 'stripe',
            failureReason: paymentIntent.last_payment_error?.message || 'Unknown error'
          }
        };
      }
      return registration;
    });

    // Update user document with all changes
    await userRef.update({
      payments: updatedPayments,
      registrations: updatedRegistrations,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Payment failed for user: ${userEmail}, registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

// ===== OPTIMIZED PAYPAL WEBHOOK HANDLERS =====

async function handleOptimizedPayPalPaymentSuccess(capture: PayPalCapture) {
  try {
    const registrationId = capture.custom_id;
    const { userEmail, conferenceId } = capture.custom_id_metadata || {};
    
    if (!userEmail || !registrationId) {
      console.error('Missing required metadata in PayPal capture');
        return;
      }

    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.error(`User ${userEmail} not found`);
      return;
    }

    const userData = userDoc.data() as UserDocument;
    
    if (!userData) {
      console.error(`User data not found for ${userEmail}`);
      return;
    }
    
    // Update payment status in user document
    const updatedPayments = userData.payments.map((payment: PaymentData) => {
      if (payment.registrationId === registrationId && payment.paymentMethod === 'paypal') {
        return {
          ...payment,
          status: 'succeeded',
          paypalCaptureId: capture.id,
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentDetails: {
            amount: parseFloat(capture.amount.value),
            currency: capture.amount.currency_code,
            status: 'succeeded',
            paypalCaptureId: capture.id
          }
        };
      }
      return payment;
    });

    // Update registration status
    const updatedRegistrations = userData.registrations.map((registration: RegistrationData) => {
      if (registration.id === registrationId) {
        return {
          ...registration,
          status: 'paid',
          paymentStatus: 'completed',
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentInfo: {
            paypalCaptureId: capture.id,
            amount: parseFloat(capture.amount.value),
            currency: capture.amount.currency_code,
            status: 'succeeded',
            paymentMethod: 'paypal'
          }
        };
      }
      return registration;
    });

    // Calculate total spent
    const totalSpent = updatedPayments
      .filter((p: PaymentData) => p.status === 'succeeded')
      .reduce((sum: number, p: PaymentData) => sum + (p.amount || 0), 0);

    // Update user document with all changes
    await userRef.update({
      payments: updatedPayments,
      registrations: updatedRegistrations,
      totalSpent: totalSpent,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

    // Update conference analytics
    if (conferenceId) {
      await db.collection('conferences').doc(conferenceId).update({
        totalRevenue: admin.firestore.FieldValue.increment(parseFloat(capture.amount.value)),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    console.log(`PayPal payment succeeded for user: ${userEmail}, registration: ${registrationId}`);
    } catch (error) {
    console.error('Error handling PayPal payment success:', error);
  }
}

async function handleOptimizedPayPalPaymentFailure(capture: PayPalCapture) {
  try {
    const registrationId = capture.custom_id;
    const { userEmail } = capture.custom_id_metadata || {};
    
    if (!userEmail || !registrationId) {
      console.error('Missing required metadata in PayPal capture');
      return;
    }

    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.error(`User ${userEmail} not found`);
      return;
    }

    const userData = userDoc.data() as UserDocument;
    
    if (!userData) {
      console.error(`User data not found for ${userEmail}`);
      return;
    }
    
    // Update payment status in user document
    const updatedPayments = userData.payments.map((payment: PaymentData) => {
      if (payment.registrationId === registrationId && payment.paymentMethod === 'paypal') {
        return {
          ...payment,
          status: 'failed',
          paypalCaptureId: capture.id,
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          failureReason: capture.reason_code || 'Payment denied',
          paymentDetails: {
            amount: parseFloat(capture.amount.value),
            currency: capture.amount.currency_code,
            status: 'failed',
            paypalCaptureId: capture.id,
            failureReason: capture.reason_code || 'Payment denied'
          }
        };
      }
      return payment;
    });

    // Update registration status
    const updatedRegistrations = userData.registrations.map((registration: RegistrationData) => {
      if (registration.id === registrationId) {
        return {
          ...registration,
          status: 'payment_failed',
          paymentStatus: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentInfo: {
            paypalCaptureId: capture.id,
            amount: parseFloat(capture.amount.value),
            currency: capture.amount.currency_code,
            status: 'failed',
            paymentMethod: 'paypal',
            failureReason: capture.reason_code || 'Payment denied'
          }
        };
      }
      return registration;
    });

    // Update user document with all changes
    await userRef.update({
      payments: updatedPayments,
      registrations: updatedRegistrations,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`PayPal payment failed for user: ${userEmail}, registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling PayPal payment failure:', error);
  }
}

async function handleOptimizedPayPalPaymentRefund(capture: PayPalCapture) {
  try {
    const registrationId = capture.custom_id;
    const { userEmail } = capture.custom_id_metadata || {};
    
    if (!userEmail || !registrationId) {
      console.error('Missing required metadata in PayPal refund');
      return;
    }

    const userRef = db.collection('users').doc(userEmail);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      console.error(`User ${userEmail} not found`);
      return;
    }

    const userData = userDoc.data() as UserDocument;
    
    if (!userData) {
      console.error(`User data not found for ${userEmail}`);
      return;
    }
    
    // Update payment status in user document
    const updatedPayments = userData.payments.map((payment: PaymentData) => {
      if (payment.registrationId === registrationId && payment.paymentMethod === 'paypal') {
        return {
          ...payment,
          status: 'refunded',
          paypalRefundId: capture.id,
          refundedAt: admin.firestore.FieldValue.serverTimestamp(),
          refundAmount: parseFloat(capture.amount.value),
          paymentDetails: {
            ...payment.paymentDetails,
            status: 'refunded',
            paypalRefundId: capture.id,
            refundAmount: parseFloat(capture.amount.value)
          }
        };
      }
      return payment;
    });

    // Update registration status
    const updatedRegistrations = userData.registrations.map((registration: RegistrationData) => {
      if (registration.id === registrationId) {
        return {
          ...registration,
          status: 'refunded',
          paymentStatus: 'refunded',
          refundedAt: admin.firestore.FieldValue.serverTimestamp(),
          paymentInfo: {
            ...registration.paymentInfo,
            status: 'refunded',
            paypalRefundId: capture.id,
            refundAmount: parseFloat(capture.amount.value)
          }
        };
      }
      return registration;
    });

    // Recalculate total spent (subtract refund amount)
    const totalSpent = updatedPayments
      .filter((p: PaymentData) => p.status === 'succeeded')
      .reduce((sum: number, p: PaymentData) => sum + (p.amount || 0), 0);

    // Update user document with all changes
    await userRef.update({
      payments: updatedPayments,
      registrations: updatedRegistrations,
      totalSpent: totalSpent,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`PayPal payment refunded for user: ${userEmail}, registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling PayPal payment refund:', error);
  }
}

// ===== FILE UPLOAD HANDLING =====

// Upload document file to Firebase Storage
export const uploadDocument = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { file, fileName, userId } = request.body;

      if (!file || !fileName || !userId) {
        response.status(400).json({ 
          success: false, 
          error: 'Missing required fields: file, fileName, userId' 
        });
        return;
      }

      // Create a reference to the file in Firebase Storage
      const bucket = admin.storage().bucket();
      const fileRef = bucket.file(`abstracts/${userId}/${Date.now()}_${fileName}`);
      
      // Upload the file
      await fileRef.save(Buffer.from(file, 'base64'), {
        metadata: {
          contentType: 'application/pdf', // or detect from fileName
          metadata: {
            userId: userId,
            uploadedAt: new Date().toISOString()
          }
        }
      });

      // Make the file publicly accessible
      await fileRef.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

      response.status(200).json({
        success: true,
        fileUrl: publicUrl,
        fileName: fileName,
        message: 'File uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      response.status(500).json({ 
        success: false, 
        error: 'File upload failed: ' + (error instanceof Error ? error.message : 'Unknown error')
      });
    }
  });
});

// ===== OPTIMIZED ABSTRACT SUBMISSION =====

// Submit abstract with optimized user management
export const submitAbstract = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { 
        email, 
        conferenceId, 
        title,
        authors,
        documentUrl
      } = request.body;

      // Input validation
      if (!email || !conferenceId || !title) {
        console.error('❌ Validation failed:', {
          email: email,
          conferenceId: conferenceId,
          title: title
        });
        response.status(400).json({ 
          error: 'Email, conference ID, and title are required. Try again or contact support' 
        });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        response.status(400).json({ error: 'Invalid email format' });
        return;
      }



      // Use email as document ID for consistency
      const userRef = db.collection('users').doc(email);
      
      // Get existing user data
      const userDoc = await userRef.get();
      const existingUser = userDoc.exists ? userDoc.data() : null;

      // Create abstract data
      const abstractId = `abs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const currentTime = new Date();
      const abstractData = {
        id: abstractId,
        conferenceId,
        title,
        authors: authors || [],
        documentUrl: documentUrl || null,
        status: 'submitted',
        submittedAt: currentTime,
        updatedAt: currentTime
      };

      // Prepare user data with embedded arrays
      const userData = {
        email,
        personalInfo: existingUser?.personalInfo || {
          firstName: '',
          lastName: '',
          email: email,
          phone: '',
          organization: '',
          designation: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
        },
        registrations: existingUser?.registrations || [],
        abstracts: existingUser?.abstracts || [],
        payments: existingUser?.payments || [],
        totalSpent: existingUser?.totalSpent || 0,
        totalRegistrations: existingUser?.totalRegistrations || 0,
        totalAbstracts: (existingUser?.totalAbstracts || 0) + 1,
        createdAt: existingUser?.createdAt || admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      // Add new abstract
      userData.abstracts.push(abstractData);

      // Save user document
      await userRef.set(userData);

      // Update conference analytics (skip if conference doesn't exist)
      try {
        const conferenceRef = db.collection('conferences').doc(conferenceId);
        const conferenceDoc = await conferenceRef.get();
        if (conferenceDoc.exists) {
          await conferenceRef.update({
            totalAbstracts: admin.firestore.FieldValue.increment(1),
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      } catch (conferenceError) {
        console.log('Conference analytics update skipped:', conferenceError);
      }

      response.status(200).json({
        success: true,
        abstractId: abstractId,
        message: 'Abstract submitted successfully',
        userEmail: email,
        conferenceId: conferenceId
      });
    } catch (error) {
      console.error('Error submitting abstract:', error);
      response.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  });
});

// ===== UTILITY FUNCTIONS =====

export const healthCheck = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    success: true,
    message: 'Optimized Firebase Functions are running',
    timestamp: new Date().toISOString(),
    collections: ['users', 'conferences', 'webhookEvents'],
    paymentSystems: {
      stripe: stripe ? 'configured' : 'not configured',
      paypal: paypalClient ? 'configured' : 'not configured (placeholder)'
    },
    features: [
      'Optimized user management',
      'Duplicate payment prevention',
      'Atomic payment updates',
      'Comprehensive error handling',
      'Webhook event tracking',
      'Conference analytics'
    ],
    environment: 'production'
  });
});
