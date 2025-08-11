import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFExtractionResult {
  text: string;
  pageCount: number;
  wordCount: number;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modificationDate?: Date;
  };
}

export class PDFService {
  static async extractText(buffer: Buffer): Promise<PDFExtractionResult> {
    try {
      // Convert Buffer to Uint8Array
      const uint8Array = new Uint8Array(buffer);
      
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
      });
      
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      // Extract metadata
      const metadata = await pdf.getMetadata();
      const info = metadata.info;
      
      const extractedMetadata = {
        title: info.Title || undefined,
        author: info.Author || undefined,
        subject: info.Subject || undefined,
        creator: info.Creator || undefined,
        producer: info.Producer || undefined,
        creationDate: info.CreationDate ? new Date(info.CreationDate) : undefined,
        modificationDate: info.ModDate ? new Date(info.ModDate) : undefined,
      };
      
      // Extract text from all pages
      let fullText = '';
      
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine text items into a single string
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          
          fullText += pageText + '\n\n';
          
          // Clean up page resources
          page.cleanup();
        } catch (pageError) {
          console.warn(`Error extracting text from page ${pageNum}:`, pageError);
          // Continue with other pages
        }
      }
      
      // Clean up the extracted text
      const cleanedText = this.cleanExtractedText(fullText);
      const wordCount = this.countWords(cleanedText);
      
      // Clean up PDF resources
      pdf.destroy();
      
      return {
        text: cleanedText,
        pageCount,
        wordCount,
        metadata: extractedMetadata
      };
      
    } catch (error: any) {
      console.error('PDF text extraction error:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
  
  static async validatePDF(buffer: Buffer): Promise<boolean> {
    try {
      const uint8Array = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
      });
      
      const pdf = await loadingTask.promise;
      const isValid = pdf.numPages > 0;
      
      pdf.destroy();
      return isValid;
    } catch {
      return false;
    }
  }
  
  static async getPDFInfo(buffer: Buffer): Promise<{
    pageCount: number;
    fileSize: number;
    isPasswordProtected: boolean;
  }> {
    try {
      const uint8Array = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
      });
      
      const pdf = await loadingTask.promise;
      const info = {
        pageCount: pdf.numPages,
        fileSize: buffer.length,
        isPasswordProtected: false // PDF.js will throw an error if password protected
      };
      
      pdf.destroy();
      return info;
      
    } catch (error: any) {
      // Check if it's a password protection error
      const isPasswordProtected = error.name === 'PasswordException' || 
                                  error.message.includes('password') ||
                                  error.message.includes('encrypted');
      
      if (isPasswordProtected) {
        return {
          pageCount: 0,
          fileSize: buffer.length,
          isPasswordProtected: true
        };
      }
      
      throw error;
    }
  }
  
  // Extract text with better formatting preservation
  static async extractFormattedText(buffer: Buffer): Promise<PDFExtractionResult> {
    try {
      const uint8Array = new Uint8Array(buffer);
      const loadingTask = pdfjsLib.getDocument({
        data: uint8Array,
        useSystemFonts: true,
      });
      
      const pdf = await loadingTask.promise;
      const pageCount = pdf.numPages;
      
      let fullText = '';
      const pageTexts: string[] = [];
      
      for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Sort text items by position for better reading order
          const sortedItems = textContent.items.sort((a: any, b: any) => {
            // Sort by Y coordinate (top to bottom), then X coordinate (left to right)
            if (Math.abs(a.transform[5] - b.transform[5]) > 5) {
              return b.transform[5] - a.transform[5]; // Higher Y values first (top to bottom)
            }
            return a.transform[4] - b.transform[4]; // Lower X values first (left to right)
          });
          
          // Group text items into lines based on Y coordinate
          const lines: string[] = [];
          let currentLine = '';
          let currentY = -1;
          
          for (const item of sortedItems) {
            const itemY = Math.round(item.transform[5]);
            
            if (currentY === -1 || Math.abs(currentY - itemY) > 5) {
              // New line
              if (currentLine.trim()) {
                lines.push(currentLine.trim());
              }
              currentLine = item.str;
              currentY = itemY;
            } else {
              // Same line
              currentLine += ' ' + item.str;
            }
          }
          
          // Add the last line
          if (currentLine.trim()) {
            lines.push(currentLine.trim());
          }
          
          const pageText = lines.join('\n');
          pageTexts.push(pageText);
          fullText += pageText + '\n\n';
          
          page.cleanup();
        } catch (pageError) {
          console.warn(`Error extracting formatted text from page ${pageNum}:`, pageError);
        }
      }
      
      const cleanedText = this.cleanExtractedText(fullText);
      const wordCount = this.countWords(cleanedText);
      
      pdf.destroy();
      
      return {
        text: cleanedText,
        pageCount,
        wordCount
      };
      
    } catch (error: any) {
      console.error('Formatted PDF text extraction error:', error);
      // Fallback to basic extraction
      return this.extractText(buffer);
    }
  }
  
  private static cleanExtractedText(text: string): string {
    return text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove excessive line breaks
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Remove leading/trailing whitespace from lines
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n')
      // Final cleanup
      .trim();
  }
  
  private static countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }
  
  // Extract specific sections or patterns
  static extractSections(text: string): {
    headings: string[];
    paragraphs: string[];
    tables: string[];
    lists: string[];
  } {
    const lines = text.split('\n');
    
    const headings: string[] = [];
    const paragraphs: string[] = [];
    const tables: string[] = [];
    const lists: string[] = [];
    
    let currentParagraph = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        if (currentParagraph) {
          paragraphs.push(currentParagraph.trim());
          currentParagraph = '';
        }
        continue;
      }
      
      // Detect headings (short lines, often in caps or with special formatting)
      if (trimmedLine.length < 100 && 
          (trimmedLine === trimmedLine.toUpperCase() || 
           /^\d+\./.test(trimmedLine) ||
           /^[A-Z][A-Z\s]+$/.test(trimmedLine))) {
        headings.push(trimmedLine);
      }
      // Detect lists (lines starting with bullets or numbers)
      else if (/^[\•\-\*\+]/.test(trimmedLine) || /^\d+\./.test(trimmedLine)) {
        lists.push(trimmedLine);
      }
      // Detect tables (lines with multiple spaces or tabs)
      else if (/\t/.test(trimmedLine) || /\s{3,}/.test(trimmedLine)) {
        tables.push(trimmedLine);
      }
      // Regular paragraph text
      else {
        currentParagraph += ' ' + trimmedLine;
      }
    }
    
    // Add the last paragraph
    if (currentParagraph) {
      paragraphs.push(currentParagraph.trim());
    }
    
    return { headings, paragraphs, tables, lists };
  }
  
  // Extract key information using patterns
  static extractKeyInfo(text: string): {
    emails: string[];
    urls: string[];
    dates: string[];
    numbers: string[];
    phoneNumbers: string[];
  } {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const urlRegex = /https?:\/\/[^\s]+/g;
    const dateRegex = /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b|\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b/g;
    const numberRegex = /\b\d+(?:\.\d+)?\b/g;
    const phoneRegex = /\b(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g;
    
    return {
      emails: text.match(emailRegex) || [],
      urls: text.match(urlRegex) || [],
      dates: text.match(dateRegex) || [],
      numbers: text.match(numberRegex) || [],
      phoneNumbers: text.match(phoneRegex) || []
    };
  }
}