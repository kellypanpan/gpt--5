import { NextApiRequest, NextApiResponse } from 'next';
import { authUserAndCheckCredits } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';
import { OpenAIService } from '../../lib/openai';

interface CreatePromptRequest {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  price: number;
}

interface CreatePromptResponse {
  success: boolean;
  prompt: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    price: number;
    status: 'pending' | 'approved' | 'rejected';
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatePromptResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Authenticate user (no credits required for prompt creation)
    const user = await authUserAndCheckCredits(req, 0);

    const {
      title,
      description,
      content,
      category,
      tags,
      price
    } = req.body as CreatePromptRequest;

    // Validate required fields
    if (!title || !description || !content || !category) {
      return res.status(400).json({ error: 'Title, description, content, and category are required' });
    }

    // Validate title length
    if (title.length < 5 || title.length > 100) {
      return res.status(400).json({ error: 'Title must be between 5 and 100 characters' });
    }

    // Validate description length
    if (description.length < 20 || description.length > 500) {
      return res.status(400).json({ error: 'Description must be between 20 and 500 characters' });
    }

    // Validate content length
    if (content.length < 50 || content.length > 5000) {
      return res.status(400).json({ error: 'Content must be between 50 and 5000 characters' });
    }

    // Validate price
    if (price < 0 || price > 50) {
      return res.status(400).json({ error: 'Price must be between 0 and 50 credits' });
    }

    // Validate tags
    if (!Array.isArray(tags) || tags.length > 10) {
      return res.status(400).json({ error: 'Tags must be an array with maximum 10 items' });
    }

    // Content moderation
    const isContentFlagged = await OpenAIService.moderateContent(title + ' ' + description + ' ' + content);
    
    if (isContentFlagged) {
      return res.status(400).json({ error: 'Content violates our community guidelines. Please revise and try again.' });
    }

    // Clean and validate tags
    const cleanTags = tags
      .filter(tag => typeof tag === 'string' && tag.trim().length > 0)
      .map(tag => tag.trim().toLowerCase())
      .slice(0, 10);

    // Create prompt in database
    const prompt = await DatabaseService.createPrompt({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      category: category.trim(),
      tags: cleanTags,
      price: Math.max(0, Math.floor(price)),
      author_id: user.id,
    });

    res.status(201).json({
      success: true,
      prompt: {
        id: prompt.id,
        title: prompt.title,
        description: prompt.description,
        category: prompt.category,
        tags: prompt.tags,
        price: prompt.price,
        status: prompt.is_approved ? 'approved' : 'pending',
      },
    });

  } catch (error: any) {
    console.error('Create prompt error:', error);
    
    if (error.message.includes('Unauthorized')) {
      return res.status(401).json({ error: error.message });
    }

    if (error.message.includes('violates') || error.message.includes('guidelines')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create prompt' });
  }
}