import { useState } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

interface TestState {
  result: TestResult | null;
  loading: boolean;
  error: string | null;
}

export function useTestOpenAI() {
  const [state, setState] = useState<TestState>({
    result: null,
    loading: false,
    error: null
  });

  const testConnection = async () => {
    setState({ result: null, loading: true, error: null });

    try {
      const response = await fetch('/api/test-openai', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      setState({
        result,
        loading: false,
        error: result.success ? null : result.error
      });

      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'Network error';
      setState({
        result: null,
        loading: false,
        error: errorMessage
      });
      throw error;
    }
  };

  return {
    ...state,
    testConnection
  };
}