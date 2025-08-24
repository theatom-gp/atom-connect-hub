# 🔐 Environment Variables Security Guide

## 🚨 **CRITICAL SECURITY RULES**

### ❌ **NEVER Store These in Client-Side Code:**
- Stripe Secret Keys (`sk_live_*`, `sk_test_*`)
- PayPal Client Secrets
- Firebase Service Account Keys
- Database Connection Strings
- Any API keys that grant write/delete access

### ✅ **SAFE to Store in Client-Side Code:**
- Firebase Public Config (API Key, Auth Domain, Project ID)
- Stripe Publishable Keys (`pk_test_*`, `pk_live_*`)
- PayPal Client IDs (public identifier)

## 📁 **Required Environment Files**

### **1. .env.local (Local Development)**
```bash
# Create this file in your project root
# This file is IGNORED by git (never committed)

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_local_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration (PUBLIC KEY ONLY!)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# PayPal Configuration (PUBLIC KEY ONLY!)
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# Environment
NODE_ENV=development
```

### **2. .env.production (Production Builds)**
```bash
# Create this file for production builds
# This file is IGNORED by git (never committed)

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_production_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration (PUBLIC KEY ONLY!)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key

# PayPal Configuration (PUBLIC KEY ONLY!)
VITE_PAYPAL_CLIENT_ID=your_production_paypal_client_id

# Environment
NODE_ENV=production
```

## 🔧 **Firebase Functions Configuration (Server-Side)**

### **Set Firebase Functions Config:**
```bash
# Set Stripe configuration
firebase functions:config:set stripe.secret_key="sk_test_your_stripe_secret_key"
firebase functions:config:set stripe.webhook_secret="whsec_your_webhook_secret"

# Set PayPal configuration
firebase functions:config:set paypal.client_id="your_paypal_client_id"
firebase functions:config:set paypal.client_secret="your_paypal_client_secret"
firebase functions:config:set paypal.environment="sandbox"

# Set app configuration
firebase functions:config:set app.environment="development"
```

### **View Current Config:**
```bash
firebase functions:config:get
```

## 🚀 **Deployment Commands**

### **Local Development:**
```bash
# Uses .env.local automatically
npm run dev
```

### **Production Build:**
```bash
# Uses .env.production
npm run build
```

### **Deploy to Firebase:**
```bash
# Deploy hosting only
firebase deploy --only hosting

# Deploy functions only
firebase deploy --only functions

# Deploy everything
firebase deploy
```

## 🔍 **Security Checklist**

- [ ] `.env.local` created and contains only public keys
- [ ] `.env.production` created for production builds
- [ ] `.gitignore` updated to exclude all `.env*` files
- [ ] Firebase Functions config set for sensitive keys
- [ ] No secret keys in client-side code
- [ ] Environment files never committed to git
- [ ] Production keys different from development keys

## ⚠️ **Common Mistakes to Avoid**

1. **Committing .env files** - Always check .gitignore
2. **Using secret keys in client code** - Only use public keys
3. **Hardcoding API keys** - Always use environment variables
4. **Sharing environment files** - Keep them private
5. **Using same keys for dev/prod** - Use different keys for each environment

## 🆘 **If You Accidentally Expose Keys**

1. **Immediately rotate/regenerate** the exposed keys
2. **Check git history** and remove sensitive commits
3. **Update all services** with new keys
4. **Review access logs** for unauthorized usage
5. **Consider security audit** if production keys were exposed

## 📚 **Additional Resources**

- [Firebase Environment Configuration](https://firebase.google.com/docs/functions/config-env)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Stripe API Security](https://stripe.com/docs/security)
- [PayPal Security Best Practices](https://developer.paypal.com/docs/security/)

## 🎯 **Quick Setup Commands**

```bash
# 1. Create environment files
touch .env.local
touch .env.production

# 2. Set Firebase Functions config
firebase functions:config:set stripe.secret_key="sk_test_your_key"
firebase functions:config:set paypal.client_secret="your_secret"

# 3. Verify configuration
firebase functions:config:get

# 4. Test locally
npm run dev

# 5. Build and deploy
npm run build
firebase deploy --only hosting
```
