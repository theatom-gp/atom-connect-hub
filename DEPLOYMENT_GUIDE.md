# 🚀 Complete Deployment Guide for Atom Conference Hub

## 📋 **Deployment Checklist**

### **Phase 1: Firebase Production Setup** ✅
- [x] Firebase project created
- [x] Firebase configuration files added
- [x] Cloud Functions structure created
- [x] Firestore rules configured
- [x] Storage rules configured

### **Phase 2: Upgrade to Blaze Plan** 🔄
- [ ] Upgrade Firebase project to Blaze plan
- [ ] Enable billing account
- [ ] Set up spending limits

### **Phase 3: Payment Gateway Setup** 🔄
- [ ] Create Stripe account
- [ ] Get Stripe API keys
- [ ] Create PayPal Business account
- [ ] Get PayPal API credentials

### **Phase 4: Environment Configuration** 🔄
- [ ] Set production environment variables
- [ ] Configure Firebase Functions secrets
- [ ] Set up webhook endpoints

### **Phase 5: Deploy & Test** 🔄
- [ ] Deploy Firebase Functions
- [ ] Deploy Firestore rules
- [ ] Deploy Storage rules
- [ ] Deploy web app
- [ ] Test payment flows
- [ ] Test webhooks

---

## 🔥 **Phase 2: Upgrade to Firebase Blaze Plan**

### **Why Blaze Plan is Required:**
- **External API calls** (Stripe, PayPal webhooks)
- **Custom domains** for webhooks
- **Higher quotas** for production traffic
- **Pay-as-you-go** pricing (very affordable)

### **Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `the-atom-conferences`
3. Click "Upgrade" button
4. Set up billing account
5. Set spending limits (recommend $50-100/month initially)

---

## 💳 **Phase 3: Payment Gateway Setup**

### **Stripe Setup:**
1. **Create Account**: [stripe.com](https://stripe.com)
2. **Get API Keys**:
   - Publishable Key: `pk_live_...`
   - Secret Key: `sk_live_...`
3. **Create Webhook Endpoint**:
   - URL: `https://your-region-your-project.cloudfunctions.net/stripeWebhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. **Get Webhook Secret**: `whsec_...`

### **PayPal Setup:**
1. **Create Business Account**: [paypal.com/business](https://paypal.com/business)
2. **Get API Credentials**:
   - Client ID: `your_client_id`
   - Client Secret: `your_client_secret`
3. **Create Webhook**:
   - URL: `https://your-region-your-project.cloudfunctions.net/paypalWebhook`
   - Events: `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.DENIED`

---

## ⚙️ **Phase 4: Environment Configuration**

### **Create `.env.production` file:**
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_real_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Firebase Functions URL
VITE_FIREBASE_FUNCTIONS_URL=https://your-region-your-project.cloudfunctions.net

# Payment Gateway Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# App Configuration
VITE_APP_URL=https://your-app-domain.com
VITE_APP_ENVIRONMENT=production
```

### **Configure Firebase Functions Secrets:**
```bash
# Set Stripe configuration
firebase functions:config:set stripe.secret_key="sk_live_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."

# Set PayPal configuration
firebase functions:config:set paypal.client_id="your_client_id"
firebase functions:config:set paypal.client_secret="your_client_secret"
firebase functions:config:set paypal.environment="live"

# Set app configuration
firebase functions:config:set app.url="https://your-app-domain.com"
firebase functions:config:set app.environment="production"
```

---

## 🚀 **Phase 5: Deploy & Test**

### **1. Install Dependencies:**
```bash
cd functions
npm install
npm run build
cd ..
```

### **2. Deploy Firebase Services:**
```bash
# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage

# Deploy Functions
firebase deploy --only functions

# Deploy Hosting (if using Firebase Hosting)
firebase deploy --only hosting
```

### **3. Deploy Web App:**
```bash
# Build production version
npm run build

# Deploy to your hosting platform
# (Vercel, Netlify, Firebase Hosting, etc.)
```

### **4. Test Payment Flows:**
- [ ] Test Stripe payment creation
- [ ] Test PayPal order creation
- [ ] Test successful payments
- [ ] Test failed payments
- [ ] Verify webhook processing

---

## 🔗 **Webhook Configuration**

### **Stripe Webhook:**
- **Endpoint**: `https://your-region-your-project.cloudfunctions.net/stripeWebhook`
- **Events**: 
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
- **Secret**: Use the `whsec_...` from Stripe Dashboard

### **PayPal Webhook:**
- **Endpoint**: `https://your-region-your-project.cloudfunctions.net/paypalWebhook`
- **Events**:
  - `PAYMENT.CAPTURE.COMPLETED`
  - `PAYMENT.CAPTURE.DENIED`
- **Verification**: PayPal automatically verifies webhook signatures

---

## 🧪 **Testing Checklist**

### **Local Testing:**
- [ ] Firebase emulators running
- [ ] Registration form submits to Firestore
- [ ] Abstract submission works with file upload
- [ ] User relationships properly linked

### **Production Testing:**
- [ ] Firebase Functions deployed and accessible
- [ ] Payment intents created successfully
- [ ] Webhooks receiving and processing events
- [ ] Database updates happening correctly
- [ ] Error handling working properly

---

## 📊 **Monitoring & Maintenance**

### **Firebase Console:**
- Monitor function execution logs
- Check Firestore usage and performance
- Monitor Storage usage
- Set up alerts for errors

### **Payment Gateway Dashboards:**
- Stripe Dashboard: Monitor payments and webhooks
- PayPal Dashboard: Monitor transactions and webhooks
- Set up notifications for failed payments

### **App Performance:**
- Monitor page load times
- Check for JavaScript errors
- Monitor API response times
- Set up user analytics

---

## 🚨 **Common Issues & Solutions**

### **Function Deployment Fails:**
- Check Node.js version (should be 18)
- Verify all dependencies are installed
- Check Firebase CLI is up to date

### **Webhooks Not Working:**
- Verify webhook URLs are correct
- Check function logs for errors
- Ensure webhook secrets match
- Test with webhook testing tools

### **Payment Failures:**
- Check API keys are correct
- Verify currency codes match
- Check amount formatting
- Review Stripe/PayPal error logs

---

## 🎯 **Next Steps After Deployment**

1. **Set up monitoring** and alerting
2. **Implement email notifications** for successful payments
3. **Add admin dashboard** for managing registrations
4. **Set up analytics** to track user behavior
5. **Plan scaling** for increased traffic
6. **Regular security audits** and updates

---

## 📞 **Support & Resources**

- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **PayPal Developer**: [developer.paypal.com](https://developer.paypal.com)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)

---

**🎉 Your app will be production-ready after completing these steps!**
