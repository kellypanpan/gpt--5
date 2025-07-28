import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Handle Stripe webhook events for subscription management
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: 'Missing signature or webhook secret' });
  }

  let event: Stripe.Event;

  try {
    const body = JSON.stringify(req.body);
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.trial_will_end':
        await handleTrialEnding(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (subscriptionId) {
      // This is a subscription purchase
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await handleSubscriptionChange(subscription);
    } else {
      // This is a one-time purchase (lifetime plan)
      await handleLifetimePurchase(session);
    }
  } catch (error) {
    console.error('Error handling checkout completed:', error);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    
    if (customer.deleted) {
      console.error('Customer was deleted');
      return;
    }

    const email = customer.email;
    if (!email) {
      console.error('No email found for customer');
      return;
    }

    // Find user by email
    let user = await DatabaseService.getUserByClerkId(email); // This might need adjustment
    
    if (!user) {
      console.error(`User not found for email: ${email}`);
      return;
    }

    // Determine subscription type based on price
    const priceId = subscription.items.data[0]?.price.id;
    const subscriptionType = getSubscriptionTypeFromPrice(priceId);
    
    // Calculate credits based on subscription type
    const creditsToAdd = getCreditsForSubscription(subscriptionType);

    // Update user subscription
    await AuthService.updateSubscription(user.id, {
      isSubscribed: subscription.status === 'active',
      subscriptionType,
      subscriptionExpiresAt: new Date(subscription.current_period_end * 1000).toISOString(),
    });

    // Add monthly credits if subscription is active
    if (subscription.status === 'active') {
      await AuthService.addCredits(user.id, creditsToAdd);
    }

    console.log(`Updated subscription for user ${user.id}: ${subscriptionType}`);

  } catch (error) {
    console.error('Error handling subscription change:', error);
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    
    if (customer.deleted) {
      return;
    }

    const email = customer.email;
    if (!email) {
      return;
    }

    let user = await DatabaseService.getUserByClerkId(email);
    
    if (!user) {
      return;
    }

    // Update user subscription to canceled
    await AuthService.updateSubscription(user.id, {
      isSubscribed: false,
      subscriptionType: undefined,
      subscriptionExpiresAt: undefined,
    });

    console.log(`Canceled subscription for user ${user.id}`);

  } catch (error) {
    console.error('Error handling subscription canceled:', error);
  }
}

async function handleLifetimePurchase(session: Stripe.Checkout.Session) {
  try {
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    
    if (customer.deleted) {
      return;
    }

    const email = customer.email;
    if (!email) {
      return;
    }

    let user = await DatabaseService.getUserByClerkId(email);
    
    if (!user) {
      return;
    }

    // Update user to lifetime subscription
    await AuthService.updateSubscription(user.id, {
      isSubscribed: true,
      subscriptionType: 'lifetime',
      subscriptionExpiresAt: undefined, // No expiry for lifetime
    });

    // Add lifetime credits (large amount)
    await AuthService.addCredits(user.id, 10000);

    console.log(`Updated user ${user.id} to lifetime subscription`);

  } catch (error) {
    console.error('Error handling lifetime purchase:', error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    // Add credits for successful payment
    const subscriptionId = invoice.subscription as string;
    
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await handleSubscriptionChange(subscription);
    }

  } catch (error) {
    console.error('Error handling payment succeeded:', error);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    
    if (customer.deleted) {
      return;
    }

    // You might want to send an email notification or take other actions
    console.log(`Payment failed for customer ${customerId}`);

  } catch (error) {
    console.error('Error handling payment failed:', error);
  }
}

async function handleTrialEnding(subscription: Stripe.Subscription) {
  try {
    // Send notification about trial ending
    console.log(`Trial ending for subscription ${subscription.id}`);
    
  } catch (error) {
    console.error('Error handling trial ending:', error);
  }
}

function getSubscriptionTypeFromPrice(priceId: string): 'pro' | 'creator' | 'lifetime' {
  // Map Stripe price IDs to subscription types
  const priceMapping = {
    [process.env.STRIPE_PRO_PRICE_ID!]: 'pro',
    [process.env.STRIPE_CREATOR_PRICE_ID!]: 'creator',
    [process.env.STRIPE_LIFETIME_PRICE_ID!]: 'lifetime',
  } as const;

  return priceMapping[priceId] || 'pro';
}

function getCreditsForSubscription(subscriptionType: 'pro' | 'creator' | 'lifetime'): number {
  const creditsMapping = {
    pro: 500,
    creator: 1000, // Unlimited in UI, but we give a large amount
    lifetime: 0, // Lifetime users don't need credit top-ups
  };

  return creditsMapping[subscriptionType] || 0;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};