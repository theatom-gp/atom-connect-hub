"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.submitAbstract = exports.createPayPalOrder = exports.createStripePaymentIntent = exports.uploadDocument = exports.getConferences = exports.updateRegistration = exports.getRegistration = exports.createRegistration = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
// Initialize Firebase Admin
admin.initializeApp();
// Initialize Firestore
const db = admin.firestore();
// Initialize Storage
const storage = admin.storage();
// CORS middleware - allow specific origins
const corsHandler = cors({
    origin: [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:5000',
        'http://127.0.0.1:5000'
    ],
    credentials: true
});
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
// ===== PAYMENT PROCESSING FUNCTIONS =====
exports.createStripePaymentIntent = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, async () => {
        try {
            const { amount, currency = 'usd', registrationId } = request.body;
            if (!amount || !registrationId) {
                response.status(400).json({ error: 'Amount and registration ID are required' });
                return;
            }
            // Here you would integrate with Stripe
            // For now, we'll create a mock payment intent
            const paymentIntent = {
                id: `pi_${Date.now()}`,
                amount,
                currency,
                status: 'requires_payment_method',
                client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`
            };
            // Update registration with payment info
            await db.collection('registrations').doc(registrationId).update({
                paymentInfo: {
                    stripePaymentIntentId: paymentIntent.id,
                    amount,
                    currency,
                    status: 'pending'
                },
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            response.status(200).json({
                success: true,
                paymentIntent
            });
        }
        catch (error) {
            console.error('Error creating payment intent:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});
exports.createPayPalOrder = functions.https.onRequest((request, response) => {
    return corsHandler(request, response, async () => {
        try {
            const { amount, currency = 'USD', registrationId } = request.body;
            if (!amount || !registrationId) {
                response.status(400).json({ error: 'Amount and registration ID are required' });
                return;
            }
            // Here you would integrate with PayPal
            // For now, we'll create a mock order
            const paypalOrder = {
                id: `PAY-${Date.now()}`,
                status: 'CREATED',
                intent: 'CAPTURE',
                amount: {
                    currency_code: currency,
                    value: amount.toString()
                }
            };
            // Update registration with payment info
            await db.collection('registrations').doc(registrationId).update({
                paymentInfo: {
                    paypalOrderId: paypalOrder.id,
                    amount,
                    currency,
                    status: 'pending'
                },
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            response.status(200).json({
                success: true,
                paypalOrder
            });
        }
        catch (error) {
            console.error('Error creating PayPal order:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
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
exports.healthCheck = functions.https.onRequest((request, response) => {
    response.status(200).json({
        success: true,
        message: 'Firebase Functions are running',
        timestamp: new Date().toISOString()
    });
});
//# sourceMappingURL=index.js.map