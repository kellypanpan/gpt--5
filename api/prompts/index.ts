import { NextApiRequest, NextApiResponse } from 'next';
import { getOptionalUser } from '../../lib/auth';
import { DatabaseService } from '../../lib/database';

interface PromptsQuery {
  category?: string;
  search?: string;
  page?: string;
  limit?: string;
  featured?: string;
}

interface PromptsResponse {
  prompts: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    price: number;
    author: string;
    likes: number;
    downloads: number;
    isFeatured: boolean;
    createdAt: string;
    isLiked?: boolean;
    isPurchased?: boolean;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PromptsResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get optional user (for likes and purchases)
    const user = await getOptionalUser(req);

    const {
      category,
      search,
      page = '1',
      limit = '20',
      featured
    } = req.query as PromptsQuery;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const offset = (pageNum - 1) * limitNum;

    // Get prompts from database
    const { prompts, total } = await DatabaseService.getPrompts({
      category,
      search,
      limit: limitNum,
      offset,
      featured_only: featured === 'true',
    });

    // Get user's purchases and likes if authenticated
    let userPurchases: string[] = [];
    let userLikes: string[] = [];

    if (user) {
      const purchases = await DatabaseService.getUserPurchases(user.id);
      userPurchases = purchases.map(p => p.prompt_id);

      // Get user likes (you'd need to implement this in DatabaseService)
      // userLikes = await DatabaseService.getUserLikes(user.id);
    }

    // Format prompts for response
    const formattedPrompts = prompts.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      category: prompt.category,
      tags: prompt.tags,
      price: prompt.price,
      author: prompt.users?.email || 'Anonymous',
      likes: prompt.likes,
      downloads: prompt.downloads,
      isFeatured: prompt.is_featured,
      createdAt: prompt.created_at,
      isLiked: userLikes.includes(prompt.id),
      isPurchased: userPurchases.includes(prompt.id) || prompt.price === 0,
    }));

    // Get available categories
    const categories = await getAvailableCategories();

    const response: PromptsResponse = {
      prompts: formattedPrompts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
      categories,
    };

    res.status(200).json(response);

  } catch (error: any) {
    console.error('Prompts API error:', error);
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
}

async function getAvailableCategories(): Promise<string[]> {
  // This could be dynamic from database or static list
  return [
    'Writing',
    'Marketing',
    'Social Media',
    'E-commerce',
    'Education',
    'Business',
    'Creative',
    'Technical',
    'Personal',
    'Health',
    'Finance',
    'Legal',
  ];
}