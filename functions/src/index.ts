import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';
import { PayPalClient } from '@paypal/checkout-server-sdk';

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16',
});

// Initialize PayPal
const paypalClient = new PayPalClient({
  clientId: functions.config().paypal.client_id,
  clientSecret: functions.config().paypal.client_secret,
  environment: functions.config().paypal.environment || 'sandbox'
});

// Initialize Firestore
const db = admin.firestore();

// Initialize Storage
const storage = admin.storage();

// CORS middleware - allow specific origins
const corsHandler = (req: any, res: any, next: any) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  next();
};

// ===== USER REGISTRATION FUNCTIONS =====

export const createRegistration = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { 
        conferenceId, 
        registrationType, 
        personalInfo, 
        paymentInfo,
        documents 
      } = request.body;

      // Validate required fields
      if (!conferenceId || !registrationType || !personalInfo) {
        response.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Create registration document
      const registrationData = {
        conferenceId,
        registrationType,
        personalInfo,
        paymentInfo: paymentInfo || null,
        documents: documents || [],
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('registrations').add(registrationData);

      response.status(201).json({
        success: true,
        registrationId: docRef.id,
        message: 'Registration created successfully'
      });
    } catch (error) {
      console.error('Error creating registration:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

export const getRegistration = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { registrationId } = request.params;

      if (!registrationId) {
        response.status(400).json({ error: 'Registration ID is required' });
        return;
      }

      const doc = await db.collection('registrations').doc(registrationId).get();

      if (!doc.exists) {
        response.status(404).json({ error: 'Registration not found' });
        return;
      }

      response.status(200).json({
        success: true,
        registration: { id: doc.id, ...doc.data() }
      });
    } catch (error) {
      console.error('Error fetching registration:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

export const updateRegistration = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { registrationId } = request.params;
      const updateData = request.body;

      if (!registrationId) {
        response.status(400).json({ error: 'Registration ID is required' });
        return;
      }

      // Add updated timestamp
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();

      await db.collection('registrations').doc(registrationId).update(updateData);

      response.status(200).json({
        success: true,
        message: 'Registration updated successfully'
      });
    } catch (error) {
      console.error('Error updating registration:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ===== CONFERENCE FUNCTIONS =====

export const getConferences = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const snapshot = await db.collection('conferences')
        .where('isActive', '==', true)
        .orderBy('startDate', 'asc')
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

// ===== DOCUMENT UPLOAD FUNCTIONS =====

export const uploadDocument = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { userId, documentType, fileName, fileData } = request.body;

      if (!userId || !documentType || !fileName || !fileData) {
        response.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Create document reference
      const documentRef = storage.bucket().file(`userDocuments/${userId}/${fileName}`);

      // Upload file (base64 encoded)
      const buffer = Buffer.from(fileData, 'base64');
      await documentRef.save(buffer, {
        metadata: {
          contentType: 'application/octet-stream',
          metadata: {
            userId,
            documentType,
            uploadedAt: new Date().toISOString()
          }
        }
      });

      // Save document metadata to Firestore
      const documentData = {
        userId,
        documentType,
        fileName,
        filePath: `userDocuments/${userId}/${fileName}`,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('userDocuments').add(documentData);

      response.status(201).json({
        success: true,
        documentId: docRef.id,
        message: 'Document uploaded successfully'
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ===== STRIPE PAYMENT FUNCTIONS =====

export const createStripePaymentIntent = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { amount, registrationId, userId, conferenceId, currency = 'usd', metadata, idempotencyKey } = req.body;

    if (!amount || !registrationId || !userId || !conferenceId) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    // Check for idempotency key in headers
    const headerIdempotencyKey = req.headers['idempotency-key'] as string;
    const finalIdempotencyKey = idempotencyKey || headerIdempotencyKey;

    if (!finalIdempotencyKey) {
      res.status(400).json({ success: false, error: 'Idempotency key is required' });
      return;
    }

    // Check if payment with this idempotency key already exists
    const existingPaymentQuery = admin.firestore().collection('payments')
      .where('idempotencyKey', '==', finalIdempotencyKey)
      .limit(1);
    
    const existingPaymentSnapshot = await existingPaymentQuery.get();
    if (!existingPaymentSnapshot.empty) {
      const existingPayment = existingPaymentSnapshot.docs[0];
      const existingPaymentData = existingPayment.data();
      
      // Return existing payment intent if it exists
      res.json({
        success: true,
        paymentIntent: {
          id: existingPaymentData.id || existingPayment.id,
          client_secret: existingPaymentData.client_secret,
          status: existingPaymentData.status,
          amount: existingPaymentData.amount,
          currency: existingPaymentData.currency
        },
        isExisting: true,
        message: 'Payment intent already exists with this idempotency key'
      });
      return;
    }

    // Check if registration already has a successful payment
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    const registrationDoc = await registrationRef.get();
    
    if (registrationDoc.exists) {
      const registrationData = registrationDoc.data();
      if (registrationData?.paymentId) {
        const paymentDoc = await admin.firestore().collection('payments').doc(registrationData.paymentId).get();
        if (paymentDoc.exists) {
          const paymentData = paymentDoc.data();
          if (paymentData?.status === 'succeeded') {
            return res.status(400).json({ 
              success: false, 
              error: 'Registration already has a successful payment' 
            });
          }
        }
      }
    }

    // Create payment intent with idempotency key
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        ...metadata,
        idempotencyKey: finalIdempotencyKey,
        registrationId,
        userId,
        conferenceId
      },
      automatic_payment_methods: {
        enabled: true,
      }
    }, {
      idempotencyKey: finalIdempotencyKey // Stripe's idempotency key in options
    });

    res.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      },
      idempotencyKey: finalIdempotencyKey,
      isExisting: false
    });
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    
    // Handle Stripe idempotency errors
    if (error instanceof Error && error.message.includes('idempotency')) {
      res.status(409).json({ 
        success: false, 
        error: 'Payment intent with this idempotency key already exists',
        code: 'IDEMPOTENCY_CONFLICT'
      });
      return;
    }
    
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Stripe webhook handler with duplicate prevention
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = functions.config().stripe.webhook_secret;

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
    // Check if we've already processed this webhook event
    const eventId = event.id;
    const eventProcessedQuery = admin.firestore().collection('webhookEvents')
      .where('stripeEventId', '==', eventId)
      .limit(1);
    
    const eventProcessedSnapshot = await eventProcessedQuery.get();
    if (!eventProcessedSnapshot.empty) {
      console.log(`Webhook event ${eventId} already processed, skipping`);
      return res.json({ received: true, message: 'Event already processed' });
    }

    // Mark this event as being processed
    await admin.firestore().collection('webhookEvents').add({
      stripeEventId: eventId,
      eventType: event.type,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'processing'
    });

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as completed
    await admin.firestore().collection('webhookEvents').add({
      stripeEventId: eventId,
      eventType: event.type,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'completed'
    });

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Mark event as failed
    if (event?.id) {
      await admin.firestore().collection('webhookEvents').add({
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

// ===== PAYPAL PAYMENT FUNCTIONS =====

export const createPayPalOrder = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { amount, registrationId, currency = 'USD', intent = 'CAPTURE', metadata } = req.body;

    if (!amount || !registrationId) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    // Create PayPal order
    const request = new paypalClient.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: intent,
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toString()
        },
        custom_id: registrationId,
        custom_id_metadata: metadata, // Add metadata to custom_id_metadata
        description: `Conference Registration - ${metadata?.conferenceId || 'Unknown Conference'}`
      }],
      application_context: {
        return_url: `${functions.config().app.url}/payment/success`,
        cancel_url: `${functions.config().app.url}/payment/cancel`
      }
    });

    const order = await paypalClient.execute(request);

    res.json({
      success: true,
      order: {
        id: order.result.id,
        status: order.result.status,
        intent: order.result.intent,
        links: order.result.links
      }
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// PayPal webhook handler
export const paypalWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const event = req.body;
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePayPalPaymentSuccess(event.resource);
        break;
      case 'PAYMENT.CAPTURE.DENIED':
        await handlePayPalPaymentFailure(event.resource);
        break;
      default:
        console.log(`Unhandled PayPal event: ${event.event_type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    res.status(500).json({ error: 'PayPal webhook processing failed' });
  }
});

// ===== ABSTRACT SUBMISSION FUNCTIONS =====

export const submitAbstract = functions.https.onRequest((request, response) => {
  return corsHandler(request, response, async () => {
    try {
      const { 
        conferenceId, 
        authorInfo, 
        abstractTitle, 
        abstractText, 
        keywords,
        documentFile 
      } = request.body;

      if (!conferenceId || !authorInfo || !abstractTitle || !abstractText) {
        response.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Create abstract document
      const abstractData = {
        conferenceId,
        authorInfo,
        abstractTitle,
        abstractText,
        keywords: keywords || [],
        documentFile: documentFile || null,
        status: 'submitted',
        submittedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('abstracts').add(abstractData);

      response.status(201).json({
        success: true,
        abstractId: docRef.id,
        message: 'Abstract submitted successfully'
      });
    } catch (error) {
      console.error('Error submitting abstract:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
});

// ===== UTILITY FUNCTIONS =====

export const healthCheck = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    success: true,
    message: 'Firebase Functions are running',
    timestamp: new Date().toISOString(),
    environment: functions.config().app.environment || 'development'
  });
});

// ===== WEBHOOK HANDLERS =====

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { registrationId, conferenceId, userId } = paymentIntent.metadata;
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'paid',
      paymentStatus: 'completed',
      paymentInfo: {
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: 'succeeded',
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentMethod: 'stripe'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update payment record
    const paymentsQuery = admin.firestore().collection('payments')
      .where('registrationId', '==', registrationId)
      .where('paymentMethod', '==', 'stripe');
    
    const paymentSnapshot = await paymentsQuery.get();
    if (!paymentSnapshot.empty) {
      const paymentDoc = paymentSnapshot.docs[0];
      await paymentDoc.ref.update({
        status: 'succeeded',
        paymentDetails: {
          stripePaymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'succeeded',
          paidAt: admin.firestore.FieldValue.serverTimestamp()
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Update user's registration status
    if (userId) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        [`registrations.${registrationId}.status`]: 'paid',
        [`registrations.${registrationId}.paymentStatus`]: 'completed',
        [`registrations.${registrationId}.paidAt`]: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Update user's payment history
      if (!paymentSnapshot.empty) {
        const paymentDoc = paymentSnapshot.docs[0];
        await userRef.update({
          [`payments.${paymentDoc.id}.status`]: 'succeeded',
          [`payments.${paymentDoc.id}.paidAt`]: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    // TODO: Send confirmation email
    console.log(`Payment succeeded for registration: ${registrationId}, user: ${userId}, conference: ${conferenceId}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { registrationId, userId } = paymentIntent.metadata;
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'payment_failed',
      paymentStatus: 'failed',
      paymentInfo: {
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        failureReason: paymentIntent.last_payment_error?.message || 'Unknown error',
        paymentMethod: 'stripe'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update payment record
    const paymentsQuery = admin.firestore().collection('payments')
      .where('registrationId', '==', registrationId)
      .where('paymentMethod', '==', 'stripe');
    
    const paymentSnapshot = await paymentsQuery.get();
    if (!paymentSnapshot.empty) {
      const paymentDoc = paymentSnapshot.docs[0];
      await paymentDoc.ref.update({
        status: 'failed',
        paymentDetails: {
          stripePaymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp(),
          failureReason: paymentIntent.last_payment_error?.message || 'Unknown error'
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Update user's registration status
    if (userId) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        [`registrations.${registrationId}.status`]: 'payment_failed',
        [`registrations.${registrationId}.paymentStatus`]: 'failed',
        [`registrations.${registrationId}.failedAt`]: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Update user's payment history
      if (!paymentSnapshot.empty) {
        const paymentDoc = paymentSnapshot.docs[0];
        await userRef.update({
          [`payments.${paymentDoc.id}.status`]: 'failed',
          [`payments.${paymentDoc.id}.failedAt`]: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    console.log(`Payment failed for registration: ${registrationId}, user: ${userId}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePayPalPaymentSuccess(capture: any) {
  try {
    const registrationId = capture.custom_id;
    const { userId, conferenceId } = capture.custom_id_metadata || {};
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'paid',
      paymentStatus: 'completed',
      paymentInfo: {
        paypalCaptureId: capture.id,
        amount: parseFloat(capture.amount.value),
        currency: capture.amount.currency_code,
        status: 'succeeded',
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentMethod: 'paypal'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update payment record
    const paymentsQuery = admin.firestore().collection('payments')
      .where('registrationId', '==', registrationId)
      .where('paymentMethod', '==', 'paypal');
    
    const paymentSnapshot = await paymentsQuery.get();
    if (!paymentSnapshot.empty) {
      const paymentDoc = paymentSnapshot.docs[0];
      await paymentDoc.ref.update({
        status: 'succeeded',
        paymentDetails: {
          paypalCaptureId: capture.id,
          amount: parseFloat(capture.amount.value),
          currency: capture.amount.currency_code,
          status: 'succeeded',
          paidAt: admin.firestore.FieldValue.serverTimestamp()
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Update user's registration status
    if (userId) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        [`registrations.${registrationId}.status`]: 'paid',
        [`registrations.${registrationId}.paymentStatus`]: 'completed',
        [`registrations.${registrationId}.paidAt`]: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Update user's payment history
      if (!paymentSnapshot.empty) {
        const paymentDoc = paymentSnapshot.docs[0];
        await userRef.update({
          [`payments.${paymentDoc.id}.status`]: 'succeeded',
          [`payments.${paymentDoc.id}.paidAt`]: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    console.log(`PayPal payment succeeded for registration: ${registrationId}, user: ${userId}, conference: ${conferenceId}`);
  } catch (error) {
    console.error('Error handling PayPal payment success:', error);
  }
}

async function handlePayPalPaymentFailure(capture: any) {
  try {
    const registrationId = capture.custom_id;
    const { userId } = capture.custom_id_metadata || {};
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'payment_failed',
      paymentStatus: 'failed',
      paymentInfo: {
        paypalCaptureId: capture.id,
        amount: parseFloat(capture.amount.value),
        currency: capture.amount.currency_code,
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        paymentMethod: 'paypal'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update payment record
    const paymentsQuery = admin.firestore().collection('payments')
      .where('registrationId', '==', registrationId)
      .where('paymentMethod', '==', 'paypal');
    
    const paymentSnapshot = await paymentsQuery.get();
    if (!paymentSnapshot.empty) {
      const paymentDoc = paymentSnapshot.docs[0];
      await paymentDoc.ref.update({
        status: 'failed',
        paymentDetails: {
          paypalCaptureId: capture.id,
          amount: parseFloat(capture.amount.value),
          currency: capture.amount.currency_code,
          status: 'failed',
          failedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Update user's registration status
    if (userId) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        [`registrations.${registrationId}.status`]: 'payment_failed',
        [`registrations.${registrationId}.paymentStatus`]: 'failed',
        [`registrations.${registrationId}.failedAt`]: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Update user's payment history
      if (!paymentSnapshot.empty) {
        const paymentDoc = paymentSnapshot.docs[0];
        await userRef.update({
          [`payments.${paymentDoc.id}.status`]: 'failed',
          [`payments.${paymentDoc.id}.failedAt`]: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    console.log(`PayPal payment failed for registration: ${registrationId}, user: ${userId}`);
  } catch (error) {
    console.error('Error handling PayPal payment failure:', error);
  }
}
