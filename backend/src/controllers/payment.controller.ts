import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

/**
 * 1. STRIPE & WALLETS (Apple/Google Pay)
 * Creates a PaymentIntent. The frontend confirms it using Stripe Elements.
 */
export const createStripeIntent = async (req: any, res: any) => {
  try {
    const { amount, currency = 'chf' } = req.body;
    const userId = req.user?.id; // Assumes Auth Middleware

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: { enabled: true }, // Enables Apple/Google Pay automatically
      metadata: { userId },
    });

    // Record pending transaction
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        currency,
        provider: 'STRIPE', // Covers Apple/Google Pay too in this flow
        status: 'PENDING',
        reference: paymentIntent.id
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * 2. PAYPAL
 * Creates an Order. Frontend uses PayPal Buttons to approve.
 */
export const createPaypalOrder = async (req: any, res: any) => {
  // Logic to call PayPal API /v2/checkout/orders
  // Simplified for this file
  const { amount } = req.body;
  
  // Mocking PayPal response
  const mockOrderId = "PAYPAL-ORDER-" + Date.now();
  
  await prisma.transaction.create({
    data: {
      userId: req.user?.id,
      amount,
      provider: 'PAYPAL',
      status: 'PENDING',
      reference: mockOrderId
    }
  });

  res.json({ orderId: mockOrderId });
};

/**
 * 3. TWINT (Swiss Special)
 * Simulates a provider like Datatrans or Mollie that initiates a TWINT flow.
 */
export const initTwintTransaction = async (req: any, res: any) => {
  const { amount } = req.body;
  
  // In production, you would call: POST https://api.datatrans.com/v1/transactions
  const mockTwintRef = "TWINT-" + Date.now();
  
  await prisma.transaction.create({
    data: {
      userId: req.user?.id,
      amount,
      provider: 'TWINT',
      status: 'PENDING',
      reference: mockTwintRef
    }
  });

  // Return the DeepLink usually provided by the Gateway
  res.json({ 
    redirectUrl: `twint://app/payment?token=${mockTwintRef}`, 
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=${mockTwintRef}` 
  });
};

/**
 * WEBHOOK: Stripe
 * Listens for payment_intent.succeeded
 */
export const handleStripeWebhook = async (req: any, res: any) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    // Update Transaction
    await prisma.transaction.updateMany({
      where: { reference: paymentIntent.id },
      data: { status: 'SUCCESS' }
    });

    // Grant Premium to User
    const userId = paymentIntent.metadata.userId;
    if (userId) {
        await prisma.user.update({
            where: { id: userId },
            data: { isPremium: true }
        });
    }
  }

  res.json({received: true});
};