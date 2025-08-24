# 🔗 Webhook Testing Guide

## 🧪 **Testing Your Payment Webhooks**

### **Prerequisites:**
- ✅ Firebase Functions deployed
- ✅ Stripe/PayPal accounts configured
- ✅ Webhook endpoints set up
- ✅ Webhook secrets configured

---

## 💳 **Stripe Webhook Testing**

### **1. Test Webhook Endpoint:**
```bash
# Your webhook URL should look like:
https://us-central1-your-project.cloudfunctions.net/stripeWebhook
```

### **2. Use Stripe CLI for Testing:**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local environment (for testing)
stripe listen --forward-to localhost:5001/your-project/us-central1/stripeWebhook

# Test webhook events
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
```

### **3. Manual Webhook Testing:**
1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Select your webhook endpoint
3. Click "Send test webhook"
4. Choose event type (e.g., `payment_intent.succeeded`)
5. Click "Send test webhook"
6. Check Firebase Functions logs for processing

---

## 🅿️ **PayPal Webhook Testing**

### **1. Test Webhook Endpoint:**
```bash
# Your webhook URL should look like:
https://us-central1-your-project.cloudfunctions.net/paypalWebhook
```

### **2. Use PayPal Webhook Simulator:**
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to Webhooks
3. Select your webhook
4. Click "Send test notification"
5. Choose event type (e.g., `PAYMENT.CAPTURE.COMPLETED`)
6. Send test notification
7. Check Firebase Functions logs

---

## 🔍 **Verifying Webhook Processing**

### **1. Check Firebase Functions Logs:**
```bash
# View function logs
firebase functions:log

# Filter by specific function
firebase functions:log --only stripeWebhook
firebase functions:log --only paypalWebhook
```

### **2. Check Firestore Updates:**
- Verify registration status changes to `paid`
- Check payment info is updated
- Confirm user registration arrays are updated

### **3. Expected Log Messages:**
```
✅ Payment succeeded for registration: reg_123
✅ Registration status updated to 'paid'
✅ User registration status updated
```

---

## 🚨 **Common Webhook Issues**

### **Stripe Webhook Issues:**
- **Signature verification failed**: Check webhook secret
- **Function not found**: Verify function name and deployment
- **CORS errors**: Check function CORS configuration
- **Timeout errors**: Check function execution time limits

### **PayPal Webhook Issues:**
- **Webhook not receiving events**: Verify webhook URL
- **Function errors**: Check function logs
- **Authentication issues**: Verify PayPal credentials

---

## 🛠️ **Webhook Debugging**

### **1. Enable Detailed Logging:**
```typescript
// In your Firebase Functions
console.log('Webhook received:', {
  headers: req.headers,
  body: req.body,
  method: req.method
});
```

### **2. Test with Simple Events:**
```bash
# Test basic webhook delivery
curl -X POST https://your-function-url/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### **3. Check Function Status:**
```bash
# List deployed functions
firebase functions:list

# Check function configuration
firebase functions:config:get
```

---

## ✅ **Webhook Testing Checklist**

### **Stripe Webhooks:**
- [ ] `payment_intent.succeeded` - Updates registration to paid
- [ ] `payment_intent.payment_failed` - Updates registration to failed
- [ ] Webhook signature verification working
- [ ] Database updates happening correctly
- [ ] Error handling working properly

### **PayPal Webhooks:**
- [ ] `PAYMENT.CAPTURE.COMPLETED` - Updates registration to paid
- [ ] `PAYMENT.CAPTURE.DENIED` - Updates registration to failed
- [ ] Webhook events being received
- [ ] Database updates happening correctly
- [ ] Error handling working properly

---

## 🎯 **Production Webhook Setup**

### **1. Update Webhook URLs:**
- Change from test URLs to production URLs
- Update webhook secrets for production
- Test with real payment events

### **2. Monitor Webhook Health:**
- Set up alerts for webhook failures
- Monitor webhook delivery rates
- Track webhook processing times

### **3. Scale Webhook Processing:**
- Monitor function execution times
- Set appropriate function timeouts
- Consider async processing for high volume

---

## 📊 **Webhook Monitoring**

### **Firebase Console:**
- Function execution logs
- Error rates and patterns
- Performance metrics

### **Payment Gateway Dashboards:**
- Webhook delivery status
- Failed webhook attempts
- Webhook response times

### **Custom Monitoring:**
- Database update verification
- Email notification delivery
- User experience tracking

---

**🎉 Once webhooks are working, your payment system is production-ready!**
