import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIService } from '../lib/openai';
import { authUserAndCheckCredits } from '../lib/auth';
import { DatabaseService } from '../lib/database';
import { rateLimit } from '../lib/rate-limit';
import { PDFService } from '../lib/pdf';
import multer from 'multer';
import { createRouter } from 'next-connect';

interface PDFRequest {
  text?: string;
  analysisType: 'summary' | 'qa' | 'keywords' | 'insights';
  question?: string;
  language?: string;
}

interface PDFResponse {
  analysis: string;
  type: string;
  creditsUsed: number;
  remainingCredits: number;
  metadata?: {
    wordCount: number;
    pageCount: number;
    language: string;
  };
}

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(upload.single('pdf'))
  .post(async (req: NextApiRequest & { file?: Express.Multer.File }, res: NextApiResponse) => {
    try {
      // Rate limiting
      await rateLimit(req, res, { max: 6, windowMs: 60000 }); // 6 requests per minute

      const { analysisType, question, language = 'en' } = req.body as PDFRequest;
      let text = req.body.text;

      if (!analysisType) {
        return res.status(400).json({ error: 'Analysis type is required' });
      }

      // If file is uploaded, extract text from PDF
      if (req.file) {
        try {
          const extractedData = await PDFService.extractText(req.file.buffer);
          text = extractedData.text;
          
          if (extractedData.text.length === 0) {
            return res.status(400).json({ error: 'Could not extract text from PDF. The file might be image-based or corrupted.' });
          }
        } catch (error) {
          return res.status(400).json({ error: 'Failed to process PDF file. Please ensure it\'s a valid PDF.' });
        }
      }

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'No text content provided. Please upload a PDF or provide text.' });
      }

      if (text.length > 50000) {
        return res.status(400).json({ error: 'Text is too long (max 50,000 characters). Please provide a shorter document.' });
      }

      // For Q&A analysis, question is required
      if (analysisType === 'qa' && (!question || question.trim().length === 0)) {
        return res.status(400).json({ error: 'Question is required for Q&A analysis' });
      }

      // Calculate credits based on analysis type and text length
      let creditsRequired = 3; // Base credits for PDF analysis
      if (text.length > 10000) creditsRequired = 4;
      if (text.length > 25000) creditsRequired = 5;
      if (analysisType === 'insights') creditsRequired += 1; // Insights require more processing

      // Authenticate user and check credits
      const user = await authUserAndCheckCredits(req, creditsRequired);

      // Perform analysis using OpenAI
      const analysis = await OpenAIService.analyzePDF({
        text,
        analysisType,
        question,
        language
      });

      const metadata = {
        wordCount: text.split(/\s+/).length,
        pageCount: Math.ceil(text.length / 3000), // Rough estimate
        language
      };

      // Log the generation
      await DatabaseService.logGeneration({
        userId: user.id,
        tool: 'pdf',
        creditsUsed: creditsRequired,
        prompt: `${analysisType} analysis${question ? ` - Q: ${question}` : ''}`,
        result: analysis.substring(0, 500) + '...', // Store truncated result
        status: 'success'
      });

      // Get updated user credits
      const updatedUser = await DatabaseService.getUser(user.id);

      res.status(200).json({
        analysis,
        type: analysisType,
        creditsUsed: creditsRequired,
        remainingCredits: updatedUser?.credits || 0,
        metadata
      });

    } catch (error: unknown) {
      console.error('PDF API error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('Unauthorized')) {
        return res.status(401).json({ error: errorMessage });
      }
      
      if (errorMessage.includes('credits') || errorMessage.includes('Subscription')) {
        return res.status(402).json({ error: errorMessage });
      }

      if (errorMessage.includes('Rate limit')) {
        return res.status(429).json({ error: errorMessage });
      }

      if (errorMessage.includes('PDF') || errorMessage.includes('file')) {
        return res.status(400).json({ error: errorMessage });
      }

      res.status(500).json({ error: 'Failed to analyze PDF' });
    }
  });

export default router.handler({
  onError: (err: unknown, req, res) => {
    console.error('PDF API handler error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: 'Method not allowed' });
  },
});

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser for file upload
  },
};