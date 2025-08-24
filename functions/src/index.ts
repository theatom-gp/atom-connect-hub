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
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { amount, registrationId, currency = 'usd', metadata } = req.body;

    if (!amount || !registrationId) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        client_secret: paymentIntent.client_secret,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency
      }
    });
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Stripe webhook handler
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

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
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
      paymentInfo: {
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        status: 'succeeded',
        paidAt: admin.firestore.FieldValue.serverTimestamp()
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update user's registration status
    if (userId) {
      const userRef = admin.firestore().collection('users').doc(userId);
      await userRef.update({
        [`registrations.${registrationId}.status`]: 'paid',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // TODO: Send confirmation email
    console.log(`Payment succeeded for registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  try {
    const { registrationId } = paymentIntent.metadata;
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'payment_failed',
      paymentInfo: {
        stripePaymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp(),
        failureReason: paymentIntent.last_payment_error?.message || 'Unknown error'
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Payment failed for registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handlePayPalPaymentSuccess(capture: any) {
  try {
    const registrationId = capture.custom_id;
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'paid',
      paymentInfo: {
        paypalCaptureId: capture.id,
        amount: parseFloat(capture.amount.value),
        currency: capture.amount.currency_code,
        status: 'succeeded',
        paidAt: admin.firestore.FieldValue.serverTimestamp()
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`PayPal payment succeeded for registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling PayPal payment success:', error);
  }
}

async function handlePayPalPaymentFailure(capture: any) {
  try {
    const registrationId = capture.custom_id;
    
    // Update registration status
    const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
    await registrationRef.update({
      status: 'payment_failed',
      paymentInfo: {
        paypalCaptureId: capture.id,
        amount: parseFloat(capture.amount.value),
        currency: capture.amount.currency_code,
        status: 'failed',
        failedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`PayPal payment failed for registration: ${registrationId}`);
  } catch (error) {
    console.error('Error handling PayPal payment failure:', error);
  }
}
