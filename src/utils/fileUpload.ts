// File upload utility for handling image uploads
// Note: This is a client-side implementation for demo purposes
// In a production environment, you would use a proper backend API

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export class FileUploadManager {
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  /**
   * Validate file before upload
   */
  static validateFile(file: File): { valid: boolean; error?: string } {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: '不支持的文件格式。请选择 JPG、PNG、GIF 或 WebP 格式的图片。'
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        valid: false,
        error: '文件大小超过限制。请选择小于 5MB 的图片。'
      };
    }

    return { valid: true };
  }

  /**
   * Generate a unique filename
   */
  static generateFilename(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    return `${timestamp}_${randomString}.${extension}`;
  }

  /**
   * Convert file to data URL for preview and storage
   * In a real application, this would upload to a server
   */
  static async uploadFile(file: File): Promise<UploadResult> {
    return new Promise((resolve) => {
      // Validate file first
      const validation = this.validateFile(file);
      if (!validation.valid) {
        resolve({
          success: false,
          error: validation.error
        });
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        
        // Generate filename for reference
        const filename = this.generateFilename(file.name);
        
        // In a real application, you would:
        // 1. Upload the file to your server
        // 2. Save it to public/uploads directory
        // 3. Return the public URL
        
        // For demo purposes, we'll use the data URL
        // and simulate a successful upload
        resolve({
          success: true,
          url: result // In production: `/uploads/${filename}`
        });
      };
      
      reader.onerror = () => {
        resolve({
          success: false,
          error: '文件读取失败，请重试。'
        });
      };
      
      reader.readAsDataURL(file);
    });
  }

  /**
   * Save file to local storage (for demo purposes)
   * In production, this would be handled by the server
   */
  static saveToLocalStorage(filename: string, dataUrl: string): void {
    try {
      const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
      uploadedFiles[filename] = {
        dataUrl,
        uploadedAt: new Date().toISOString(),
        size: dataUrl.length
      };
      localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
    } catch (error) {
      console.error('Failed to save file to localStorage:', error);
    }
  }

  /**
   * Get uploaded file from local storage
   */
  static getFromLocalStorage(filename: string): string | null {
    try {
      const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
      return uploadedFiles[filename]?.dataUrl || null;
    } catch (error) {
      console.error('Failed to get file from localStorage:', error);
      return null;
    }
  }

  /**
   * Clean up old files from localStorage (optional)
   */
  static cleanupOldFiles(maxAgeInDays: number = 30): void {
    try {
      const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxAgeInDays);
      
      const cleanedFiles: any = {};
      
      Object.entries(uploadedFiles).forEach(([filename, fileData]: [string, any]) => {
        const uploadDate = new Date(fileData.uploadedAt);
        if (uploadDate > cutoffDate) {
          cleanedFiles[filename] = fileData;
        }
      });
      
      localStorage.setItem('uploadedFiles', JSON.stringify(cleanedFiles));
    } catch (error) {
      console.error('Failed to cleanup old files:', error);
    }
  }
}