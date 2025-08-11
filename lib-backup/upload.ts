import { v2 as cloudinary } from 'cloudinary';
import fetch from 'node-fetch';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
}

export class UploadService {
  // Upload image from URL (for generated images)
  static async uploadFromUrl(imageUrl: string, folder: string = 'gpt5ai'): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        flags: 'progressive',
      });

      return result.secure_url;
    } catch (error: any) {
      console.error('Cloudinary upload from URL error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  // Upload image from buffer
  static async uploadFromBuffer(
    buffer: Buffer, 
    folder: string = 'gpt5ai',
    options: {
      filename?: string;
      transformation?: any;
      quality?: string;
    } = {}
  ): Promise<UploadResult> {
    try {
      const uploadOptions = {
        folder,
        resource_type: 'image' as const,
        quality: options.quality || 'auto',
        fetch_format: 'auto',
        flags: 'progressive',
        public_id: options.filename,
        transformation: options.transformation,
      };

      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${buffer.toString('base64')}`,
        uploadOptions
      );

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      };
    } catch (error: any) {
      console.error('Cloudinary upload from buffer error:', error);
      throw new Error(`Failed to upload image from buffer: ${error.message}`);
    }
  }

  // Upload PDF or document
  static async uploadDocument(
    buffer: Buffer,
    filename: string,
    folder: string = 'documents'
  ): Promise<UploadResult> {
    try {
      const result = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${buffer.toString('base64')}`,
        {
          folder,
          resource_type: 'raw',
          public_id: filename.replace(/\.[^/.]+$/, ''), // Remove extension
          use_filename: true,
        }
      );

      return {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        bytes: result.bytes,
      };
    } catch (error: any) {
      console.error('Cloudinary document upload error:', error);
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  }

  // Delete uploaded file
  static async deleteFile(publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      return result.result === 'ok';
    } catch (error: any) {
      console.error('Cloudinary delete error:', error);
      return false;
    }
  }

  // Generate optimized image transformations
  static generateImageVariants(publicId: string): {
    thumbnail: string;
    medium: string;
    large: string;
    webp: string;
  } {
    const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
    
    return {
      thumbnail: `${baseUrl}/w_150,h_150,c_fill,q_auto,f_auto/${publicId}`,
      medium: `${baseUrl}/w_500,h_500,c_fit,q_auto,f_auto/${publicId}`,
      large: `${baseUrl}/w_1200,h_1200,c_fit,q_auto,f_auto/${publicId}`,
      webp: `${baseUrl}/q_auto,f_webp/${publicId}`,
    };
  }

  // Check if upload service is configured
  static isConfigured(): boolean {
    return !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
  }
}

// Helper function for backward compatibility
export async function uploadToCloudinary(imageUrl: string, folder?: string): Promise<string> {
  return UploadService.uploadFromUrl(imageUrl, folder);
}

// File validation utilities
export class FileValidator {
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  private static readonly ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

  static validateImage(file: {
    buffer: Buffer;
    mimetype: string;
    size: number;
  }): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    if (!this.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed' };
    }

    return { valid: true };
  }

  static validateDocument(file: {
    buffer: Buffer;
    mimetype: string;
    size: number;
  }): { valid: boolean; error?: string } {
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    if (!this.ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
      return { valid: false, error: 'Invalid file type. Only PDF files are allowed' };
    }

    return { valid: true };
  }

  static sanitizeFilename(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 100);
  }
}

// Image processing utilities
export class ImageProcessor {
  static async resizeImage(
    buffer: Buffer,
    width: number,
    height: number,
    quality: number = 80
  ): Promise<Buffer> {
    // This would typically use sharp or similar library
    // For now, return the original buffer
    // TODO: Implement actual image resizing
    return buffer;
  }

  static async compressImage(buffer: Buffer, quality: number = 80): Promise<Buffer> {
    // This would typically use sharp or similar library
    // For now, return the original buffer
    // TODO: Implement actual image compression
    return buffer;
  }

  static async generateThumbnail(buffer: Buffer, size: number = 150): Promise<Buffer> {
    // This would typically use sharp or similar library
    // For now, return the original buffer
    // TODO: Implement actual thumbnail generation
    return buffer;
  }
}