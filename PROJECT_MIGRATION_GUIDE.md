# 🔄 Project Migration Guide - New Firebase Account

## 📋 **Migration Summary**

**Date**: [Current Date]  
**Old Project**: [Previous Firebase Project]  
**New Project**: `the-atom-conferences-41cda`  
**New Account**: [Your new app-specific email]

## 🔑 **New Firebase Configuration**

### **Project Details:**
- **Project ID**: `the-atom-conferences-41cda`
- **Project Number**: `550619180204`
- **Display Name**: `the-atom-conferences`
- **Region**: `us-central1`

### **Firebase Web App Configuration:**
```json
{
  "projectId": "the-atom-conferences-41cda",
  "appId": "1:550619180204:web:f3c8e74c539dd447478309",
  "storageBucket": "the-atom-conferences-41cda.firebasestorage.app",
  "apiKey": "AIzaSyBkOyq50-Sy-PRe8tuCXRDjG0sye2Rj90k",
  "authDomain": "the-atom-conferences-41cda.firebaseapp.com",
  "messagingSenderId": "550619180204",
  "measurementId": "G-4BPP8346DG"
}
```

## 📁 **Environment Variables (.env.local)**

```bash
# Firebase Configuration (NEW PROJECT)
VITE_FIREBASE_API_KEY=AIzaSyBkOyq50-Sy-PRe8tuCXRDjG0sye2Rj90k
VITE_FIREBASE_AUTH_DOMAIN=the-atom-conferences-41cda.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=the-atom-conferences-41cda
VITE_FIREBASE_STORAGE_BUCKET=the-atom-conferences-41cda.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=550619180204
VITE_FIREBASE_APP_ID=1:550619180204:web:f3c8e74c539dd447478309

# Stripe Configuration (TO BE UPDATED)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_new_stripe_key_here

# PayPal Configuration (TO BE UPDATED)
VITE_PAYPAL_CLIENT_ID=your_new_paypal_client_id_here

# Environment
NODE_ENV=development
```

## 🔧 **Firebase Functions Configuration (TO BE SET)**

```bash
# Stripe Configuration
firebase functions:config:set stripe.secret_key="sk_test_your_new_stripe_secret_key"
firebase functions:config:set stripe.webhook_secret="whsec_your_new_webhook_secret"

# PayPal Configuration  
firebase functions:config:set paypal.client_id="your_new_paypal_client_id"
firebase functions:config:set paypal.client_secret="your_new_paypal_client_secret"
firebase functions:config:set paypal.environment="sandbox"

# App Configuration
firebase functions:config:set app.environment="development"
```

## 🌐 **Webhook URLs (After Deployment)**

### **Stripe Webhook:**
```
https://us-central1-the-atom-conferences-41cda.cloudfunctions.net/stripeWebhook
```

### **PayPal Webhook:**
```
https://us-central1-the-atom-conferences-41cda.cloudfunctions.net/paypalWebhook
```

## 📊 **Current Project Status**

### **✅ Already Configured:**
- ✅ Firebase Project Setup
- ✅ Firebase Storage Rules (`storage.rules`)
- ✅ Firestore Rules (`firestore.rules`)
- ✅ Firestore Indexes (`firestore.indexes.json`)
- ✅ Firebase Functions Structure
- ✅ Hosting Configuration
- ✅ Emulator Configuration

### **⏳ Pending Configuration:**
- ⏳ Stripe API Keys (from Stripe Dashboard)
- ⏳ PayPal API Keys (from PayPal Developer Dashboard)
- ⏳ Firebase Functions Config (after getting payment keys)
- ⏳ Webhook URLs (after deployment)
- ⏳ Environment Variables (after getting payment keys)

## 🚀 **Deployment Commands**

```bash
# Build the application
npm run build

# Deploy hosting only
firebase deploy --only hosting

# Deploy functions only (after setting config)
firebase deploy --only functions

# Deploy everything
firebase deploy
```

## 🔍 **Testing Checklist**

### **Pre-Deployment:**
- [ ] Environment variables set in `.env.local`
- [ ] Firebase Functions config set
- [ ] Payment gateway keys obtained
- [ ] Local testing completed

### **Post-Deployment:**
- [ ] Hosting URL accessible
- [ ] Registration form working
- [ ] Abstract submission working
- [ ] Payment processing working
- [ ] Webhooks receiving events
- [ ] File uploads working

## 📚 **Related Documentation**

- `ENVIRONMENT_SETUP_GUIDE.md` - Environment variables setup
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `SECURE_PAYMENT_GUIDE.md` - Payment security
- `WEBHOOK_TESTING_GUIDE.md` - Webhook testing

## 🔐 **Security Notes**

- ✅ `.env.local` is in `.gitignore` (not committed)
- ✅ Firebase Storage rules configured
- ✅ Firestore rules configured
- ✅ Payment processing is server-side only
- ⚠️ Update payment keys when obtained
- ⚠️ Test webhooks after deployment

## 📞 **Support Information**

- **Firebase Console**: https://console.firebase.google.com/project/the-atom-conferences-41cda
- **Project URL**: https://the-atom-conferences-41cda.web.app
- **Git Repository**: [Your repository URL]
- **Documentation**: [Your documentation URL]
