import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Robust clipboard utility with fallbacks and proper error handling
export const clipboardUtils = {
  // Main copy function with multiple fallback methods
  async copyToClipboard(text: string, successMessage = 'Copied to clipboard'): Promise<boolean> {
    if (!text?.trim()) {
      toast.error('No content to copy');
      return false;
    }

    // Method 1: Modern Clipboard API (requires HTTPS/localhost)
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success(successMessage);
        return true;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback:', err);
      }
    }

    // Method 2: Legacy execCommand fallback
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.style.opacity = '0';
      textArea.style.pointerEvents = 'none';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        toast.success(successMessage);
        return true;
      }
    } catch (err) {
      console.warn('execCommand fallback failed:', err);
    }

    // Method 3: Final fallback - copy to variable and show instructions
    try {
      // Store in a global variable as last resort
      (window as any).lastCopiedText = text;
      toast.error('Auto-copy failed. Please manually copy the text from the output area.', {
        duration: 5000,
      });
      return false;
    } catch (err) {
      toast.error('Copy operation failed completely');
      return false;
    }
  },

  // Save function with local storage backup
  saveData(data: any, key: string, successMessage = 'Data saved successfully'): boolean {
    try {
      const timestamp = new Date().toISOString();
      const saveData = {
        ...data,
        savedAt: timestamp,
        version: '1.0'
      };
      
      const serialized = JSON.stringify(saveData, null, 2);
      localStorage.setItem(key, serialized);
      
      // Also save to a master index for tracking all saves
      const masterKey = 'prompt_workbench_saves';
      const existingSaves = JSON.parse(localStorage.getItem(masterKey) || '[]');
      const newSave = {
        key,
        timestamp,
        preview: typeof data === 'string' ? data.substring(0, 100) : JSON.stringify(data).substring(0, 100)
      };
      
      // Remove existing save with same key and add new one
      const updatedSaves = existingSaves.filter((save: any) => save.key !== key);
      updatedSaves.unshift(newSave);
      
      // Keep only last 50 saves
      const limitedSaves = updatedSaves.slice(0, 50);
      localStorage.setItem(masterKey, JSON.stringify(limitedSaves));
      
      toast.success(successMessage);
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Failed to save data');
      return false;
    }
  },

  // Export function with proper file download
  exportData(data: string, filename: string, successMessage = 'File exported successfully'): boolean {
    try {
      const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100);
      
      toast.success(successMessage);
      return true;
    } catch (err) {
      console.error('Export failed:', err);
      toast.error('Failed to export file');
      return false;
    }
  },

  // Load saved data
  loadData(key: string): any | null {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error('Load failed:', err);
      return null;
    }
  },

  // Get all saved items
  getAllSaves(): any[] {
    try {
      const masterKey = 'prompt_workbench_saves';
      return JSON.parse(localStorage.getItem(masterKey) || '[]');
    } catch (err) {
      console.error('Failed to load saves list:', err);
      return [];
    }
  }
};