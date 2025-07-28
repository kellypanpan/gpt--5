import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuthToken } from '@/lib/clerk';

interface APIResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface WriterRequest {
  prompt: string;
  tone?: string;
  length?: string;
  type?: string;
}

interface ScriptRequest {
  scene: string;
  style: string;
  platform?: string;
  duration?: string;
}

interface ImageRequest {
  prompt: string;
  size?: string;
  quality?: string;
  style?: string;
}

interface PDFRequest {
  text: string;
  analysisType: 'summary' | 'qa' | 'keywords';
  question?: string;
}

interface AgentRequest {
  message: string;
  context?: string;
  taskType?: string;
}

// Writer Hook
export function useWriter() {
  const [state, setState] = useState<APIResponse<{ content: string; creditsUsed: number; remainingCredits: number }>>({
    data: null,
    loading: false,
    error: null
  });

  const getToken = useAuthToken();

  const generateContent = async (request: WriterRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const token = await getToken();
      const response = await fetch('/api/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API call failed');
      }

      setState({ data: result, loading: false, error: null });
      toast({
        title: "Success!",
        description: `Content generated successfully. Used ${result.creditsUsed} credits.`,
      });
      return result;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { ...state, generateContent };
}

// Script Generator Hook
export function useScriptGenerator() {
  const [state, setState] = useState<APIResponse<{ script: string; creditsUsed: number; remainingCredits: number }>>({
    data: null,
    loading: false,
    error: null
  });

  const getToken = useAuthToken();

  const generateScript = async (request: ScriptRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const token = await getToken();
      const response = await fetch('/api/script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API call failed');
      }

      setState({ data: result, loading: false, error: null });
      toast({
        title: "Success!",
        description: `Script generated successfully. Used ${result.creditsUsed} credits.`,
      });
      return result;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { ...state, generateScript };
}

// Image Generator Hook
export function useImageGenerator() {
  const [state, setState] = useState<APIResponse<{ imageUrl: string; creditsUsed: number; remainingCredits: number; prompt: string }>>({
    data: null,
    loading: false,
    error: null
  });

  const getToken = useAuthToken();

  const generateImage = async (request: ImageRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const token = await getToken();
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API call failed');
      }

      setState({ data: result, loading: false, error: null });
      toast({
        title: "Success!",
        description: `Image generated successfully. Used ${result.creditsUsed} credits.`,
      });
      return result;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { ...state, generateImage };
}

// PDF Analyzer Hook
export function usePDFAnalyzer() {
  const [state, setState] = useState<APIResponse<{ analysis: string; type: string; creditsUsed: number; remainingCredits: number }>>({
    data: null,
    loading: false,
    error: null
  });

  const getToken = useAuthToken();

  const analyzePDF = async (request: PDFRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const token = await getToken();
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API call failed');
      }

      setState({ data: result, loading: false, error: null });
      toast({
        title: "Success!",
        description: `PDF analyzed successfully. Used ${result.creditsUsed} credits.`,
      });
      return result;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { ...state, analyzePDF };
}

// Agent Hook
export function useAgent() {
  const [state, setState] = useState<APIResponse<{ response: string; taskType: string; creditsUsed: number; remainingCredits: number }>>({
    data: null,
    loading: false,
    error: null
  });

  const getToken = useAuthToken();

  const sendMessage = async (request: AgentRequest) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const token = await getToken();
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API call failed');
      }

      setState({ data: result, loading: false, error: null });
      toast({
        title: "Success!",
        description: `Response generated successfully. Used ${result.creditsUsed} credits.`,
      });
      return result;
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message });
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return { ...state, sendMessage };
}