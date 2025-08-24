"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.submitAbstract = exports.paypalWebhook = exports.createPayPalOrder = exports.stripeWebhook = exports.createStripeCheckoutSession = exports.uploadDocument = exports.getConferences = exports.updateRegistration = exports.getRegistration = exports.createRegistration = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe_1 = require("stripe");
// import { Client } from '@paypal/paypal-server-sdk'; // Will be used when PayPal is properly configured
// Initialize Firebase Admin
admin.initializeApp();
// Initialize Stripe
const stripe = new stripe_1.default(functions.config().stripe.secret_key, {
    apiVersion: '2023-10-16',
});
// Initialize PayPal - Simplified for now, update when deploying
// const paypalClient = new Client({
//   clientId: functions.config().paypal.client_id,
//   clientSecret: functions.config().paypal.client_secret,
//   environment: functions.config().paypal.environment || 'sandbox'
// });
const paypalClient = null; // Will be properly initialized in production
// Initialize Firestore
const db = admin.firestore();
// Initialize Storage
const storage = admin.storage();
// CORS middleware - allow specific origins
const corsHandler = (req, res, next) => {
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
exports.createRegistration = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, async () => {
        try {
            const { conferenceId, registrationType, personalInfo, paymentInfo, documents } = request.body;
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
        }
        catch (error) {
            console.error('Error creating registration:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
exports.getRegistration = functions.https.onRequest((request, response) => {
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
                registration: Object.assign({ id: doc.id }, doc.data())
            });
        }
        catch (error) {
            console.error('Error fetching registration:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
exports.updateRegistration = functions.https.onRequest((request, response) => {
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
        }
        catch (error) {
            console.error('Error updating registration:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
// ===== CONFERENCE FUNCTIONS =====
exports.getConferences = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, async () => {
        try {
            const snapshot = await db.collection('conferences')
                .where('isActive', '==', true)
                .orderBy('startDate', 'asc')
                .get();
            const conferences = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            response.status(200).json({
                success: true,
                conferences
            });
        }
        catch (error) {
            console.error('Error fetching conferences:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
// ===== DOCUMENT UPLOAD FUNCTIONS =====
exports.uploadDocument = functions.https.onRequest((request, response) => {
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
        }
        catch (error) {
            console.error('Error uploading document:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
// ===== SECURE STRIPE PAYMENT FUNCTIONS (NO CARD DATA STORAGE) =====
exports.createStripeCheckoutSession = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    try {
        const { amount, registrationId, userId, conferenceId, currency = 'usd', metadata, idempotencyKey, successUrl, cancelUrl } = req.body;
        if (!amount || !registrationId || !userId || !conferenceId || !successUrl || !cancelUrl) {
            res.status(400).json({ success: false, error: 'Missing required fields' });
            return;
        }
        // Check for idempotency key in headers
        const headerIdempotencyKey = req.headers['idempotency-key'];
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
            // Return existing checkout session if it exists
            res.json({
                success: true,
                checkoutSession: {
                    id: existingPaymentData.id || existingPayment.id,
                    url: existingPaymentData.checkoutUrl,
                    status: existingPaymentData.status,
                    amount: existingPaymentData.amount,
                    currency: existingPaymentData.currency
                },
                isExisting: true,
                message: 'Checkout session already exists with this idempotency key'
            });
            return;
        }
        // Check if registration already has a successful payment
        const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
        const registrationDoc = await registrationRef.get();
        if (registrationDoc.exists) {
            const registrationData = registrationDoc.data();
            if (registrationData === null || registrationData === void 0 ? void 0 : registrationData.paymentId) {
                const paymentDoc = await admin.firestore().collection('payments').doc(registrationData.paymentId).get();
                if (paymentDoc.exists) {
                    const paymentData = paymentDoc.data();
                    if ((paymentData === null || paymentData === void 0 ? void 0 : paymentData.status) === 'succeeded') {
                        res.status(400).json({
                            success: false,
                            error: 'Registration already has a successful payment'
                        });
                        return;
                    }
                }
            }
        }
        // Create checkout session on Stripe (NO card data, only session)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: `Conference Registration - ${(metadata === null || metadata === void 0 ? void 0 : metadata.conferenceId) || 'Conference'}`,
                            description: `Registration for ${(metadata === null || metadata === void 0 ? void 0 : metadata.registrationId) || 'conference'}`,
                        },
                        unit_amount: Math.round(amount * 100), // Convert to cents
                    },
                    quantity: 1,
                }],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: Object.assign(Object.assign({}, metadata), { idempotencyKey: finalIdempotencyKey, registrationId,
                userId,
                conferenceId }),
            customer_email: metadata === null || metadata === void 0 ? void 0 : metadata.customerEmail,
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'AU', 'IN'], // Customize as needed
            },
            payment_intent_data: {
                metadata: {
                    idempotencyKey: finalIdempotencyKey,
                    registrationId,
                    userId,
                    conferenceId
                }
            }
        }, {
            idempotencyKey: finalIdempotencyKey // Stripe's idempotency key in options
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
    }
    catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        // Handle Stripe idempotency errors
        if (error instanceof Error && error.message.includes('idempotency')) {
            res.status(409).json({
                success: false,
                error: 'Checkout session with this idempotency key already exists',
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
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = functions.config().stripe.webhook_secret;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    }
    catch (err) {
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
            res.json({ received: true, message: 'Event already processed' });
            return;
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
                await handlePaymentSuccess(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentFailure(event.data.object);
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
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        // Mark event as failed
        if (event === null || event === void 0 ? void 0 : event.id) {
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
// ===== SECURE PAYPAL PAYMENT FUNCTIONS (NO CARD DATA STORAGE) =====
exports.createPayPalOrder = functions.https.onRequest(async (req, res) => {
    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }
    try {
        const { amount, registrationId, userId, conferenceId, 
        // currency = 'USD', // Will be used when PayPal is properly configured
        // intent = 'CAPTURE', // Will be used when PayPal is properly configured
        // metadata, // Will be used when PayPal is properly configured
        idempotencyKey, returnUrl, cancelUrl } = req.body;
        if (!amount || !registrationId || !userId || !conferenceId || !returnUrl || !cancelUrl) {
            res.status(400).json({ success: false, error: 'Missing required fields' });
            return;
        }
        // Check for idempotency key
        const headerIdempotencyKey = req.headers['idempotency-key'];
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
            // Return existing PayPal order if it exists
            res.json({
                success: true,
                order: {
                    id: existingPaymentData.id || existingPayment.id,
                    status: existingPaymentData.status,
                    intent: existingPaymentData.intent,
                    approvalUrl: existingPaymentData.approvalUrl
                },
                isExisting: true,
                message: 'PayPal order already exists with this idempotency key'
            });
            return;
        }
        // Check if registration already has a successful payment
        const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
        const registrationDoc = await registrationRef.get();
        if (registrationDoc.exists) {
            const registrationData = registrationDoc.data();
            if (registrationData === null || registrationData === void 0 ? void 0 : registrationData.paymentId) {
                const paymentDoc = await admin.firestore().collection('payments').doc(registrationData.paymentId).get();
                if (paymentDoc.exists) {
                    const paymentData = paymentDoc.data();
                    if ((paymentData === null || paymentData === void 0 ? void 0 : paymentData.status) === 'succeeded') {
                        res.status(400).json({
                            success: false,
                            error: 'Registration already has a successful payment'
                        });
                        return;
                    }
                }
            }
        }
        // Create PayPal order (NO card data, only order details)
        if (!paypalClient) {
            res.status(500).json({
                success: false,
                error: 'PayPal integration not configured yet'
            });
            return;
        }
        // TODO: Update this when deploying with proper PayPal SDK
        res.status(500).json({
            success: false,
            error: 'PayPal integration needs to be updated for production deployment'
        });
        return;
        // This will never be reached due to early return above
        // res.json will be handled in the TODO section above
    }
    catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// PayPal webhook handler
exports.paypalWebhook = functions.https.onRequest(async (req, res) => {
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
    }
    catch (error) {
        console.error('Error processing PayPal webhook:', error);
        res.status(500).json({ error: 'PayPal webhook processing failed' });
    }
});
// ===== ABSTRACT SUBMISSION FUNCTIONS =====
exports.submitAbstract = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, async () => {
        try {
            const { conferenceId, authorInfo, abstractTitle, abstractText, keywords, documentFile } = request.body;
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
        }
        catch (error) {
            console.error('Error submitting abstract:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
// ===== UTILITY FUNCTIONS =====
exports.healthCheck = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json({
        success: true,
        message: 'Firebase Functions are running',
        timestamp: new Date().toISOString(),
        environment: functions.config().app.environment || 'development'
    });
});
// ===== WEBHOOK HANDLERS =====
async function handlePaymentSuccess(paymentIntent) {
    try {
        const { registrationId, conferenceId, userId } = paymentIntent.metadata;
        // Update registration status
        const registrationRef = admin.firestore().collection('registrations').doc(registrationId);
        await registrationRef.update({
            status: 'paid',
            paymentStatus: 'completed',
            paymentInfo: {
                stripePaymentIntentId: paymentIntent.id,
                amount: paymentIntent.amount / 100,
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
    }
    catch (error) {
        console.error('Error handling payment success:', error);
    }
}
async function handlePaymentFailure(paymentIntent) {
    var _a, _b;
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
                failureReason: ((_a = paymentIntent.last_payment_error) === null || _a === void 0 ? void 0 : _a.message) || 'Unknown error',
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
                    failureReason: ((_b = paymentIntent.last_payment_error) === null || _b === void 0 ? void 0 : _b.message) || 'Unknown error'
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
    }
    catch (error) {
        console.error('Error handling payment failure:', error);
    }
}
async function handlePayPalPaymentSuccess(capture) {
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
    }
    catch (error) {
        console.error('Error handling PayPal payment success:', error);
    }
}
async function handlePayPalPaymentFailure(capture) {
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
    }
    catch (error) {
        console.error('Error handling PayPal payment failure:', error);
    }
}
//# sourceMappingURL=index.js.map