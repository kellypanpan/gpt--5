import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../../lib/auth';
import { DatabaseService } from '../../../lib/database';

interface PurchaseResponse {
  success: boolean;
  prompt?: {
    id: string;
    title: string;
    content: string;
  };
  creditsUsed: number;
  remainingCredits: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PurchaseResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Prompt ID is required' });
    }

    // Get the prompt first to check price
    const prompt = await DatabaseService.getPrompt(id);
    
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    // Check if prompt is free
    if (prompt.price === 0) {
      return res.status(400).json({ error: 'This prompt is free and does not need to be purchased' });
    }

    // Authenticate user and check credits
    const user = await authUserAndCheckCredits(req, prompt.price);

    // Check if user already purchased this prompt
    const userPurchases = await DatabaseService.getUserPurchases(user.id);
    const alreadyPurchased = userPurchases.some(p => p.prompt_id === id);

    if (alreadyPurchased) {
      return res.status(400).json({ error: 'You have already purchased this prompt' });
    }

    // Process the purchase
    const purchase = await DatabaseService.purchasePrompt({
      userId: user.id,
      promptId: id,
      pricePaid: prompt.price,
    });

    // Get updated user info
    const updatedUser = await DatabaseService.getUser(user.id);

    res.status(200).json({
      success: true,
      prompt: {
        id: prompt.id,
        title: prompt.title,
        content: prompt.content,
      },
      creditsUsed: prompt.price,
      remainingCredits: updatedUser?.credits || 0,
    });

  } catch (error: any) {
    console.error('Prompt purchase error:', error);
    
    if (error.message.includes('Unauthorized')) {
      return res.status(401).json({ error: error.message });
    }
    
    if (error.message.includes('credits')) {
      return res.status(402).json({ error: error.message });
    }

    if (error.message.includes('already purchased')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to purchase prompt' });
  }
}