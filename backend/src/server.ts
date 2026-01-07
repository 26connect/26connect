import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createStripeIntent, createPaypalOrder, initTwintTransaction, handleStripeWebhook } from './controllers/payment.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Webhook needs raw body, others need JSON
app.use('/api/webhook/stripe', express.raw({ type: 'application/json' }) as any);
app.use(express.json() as any);
app.use(cors({ origin: process.env.CLIENT_URL })); // Secure CORS

// Routes
app.get('/health', (req, res) => res.json({ status: 'OK', date: new Date() }));

// Payment Routes
app.post('/api/pay/stripe/intent', createStripeIntent);
app.post('/api/pay/paypal/order', createPaypalOrder);
app.post('/api/pay/twint/init', initTwintTransaction);

// Webhooks
app.post('/api/webhook/stripe', handleStripeWebhook);

// Start
app.listen(PORT, () => {
  console.log(`🚀 26Connect Backend running on port ${PORT}`);
  console.log(`💳 Payments Active: Stripe, PayPal, TWINT`);
});