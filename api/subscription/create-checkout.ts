import { NextApiRequest, NextApiResponse } from 'next';
import { getOptionalUser } from '../../lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface CheckoutRequest {
  priceId: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CheckoutResponse {
  url: string;
  sessionId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get authenticated user (optional for checkout)
    const user = await getOptionalUser(req);
    
    const { priceId, successUrl, cancelUrl } = req.body as CheckoutRequest;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Validate price ID
    const validPriceIds = [
      process.env.STRIPE_PRO_PRICE_ID,
      process.env.STRIPE_CREATOR_PRICE_ID,
      process.env.STRIPE_LIFETIME_PRICE_ID,
    ].filter(Boolean);

    if (!validPriceIds.includes(priceId)) {
      return res.status(400).json({ error: 'Invalid price ID' });
    }

    // Create Stripe checkout session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: priceId === process.env.STRIPE_LIFETIME_PRICE_ID ? 'payment' : 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: user?.id || 'anonymous',
        priceId,
      },
    };

    // If user is logged in, prefill customer info
    if (user) {
      sessionParams.customer_email = user.email;
      sessionParams.client_reference_id = user.id;
    }

    // Add trial for subscription plans
    if (priceId !== process.env.STRIPE_LIFETIME_PRICE_ID) {
      sessionParams.subscription_data = {
        trial_period_days: 7, // 7-day free trial
        metadata: {
          userId: user?.id || 'anonymous',
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    if (!session.url) {
      throw new Error('Failed to create checkout session URL');
    }

    res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}