import { useState, useEffect } from 'react';
import { useAuthState } from '@/lib/clerk';

interface CreditsData {
  currentCredits: number;
  totalCredits: number;
  usedCredits: number;
  subscription: {
    plan: string;
    status: 'active' | 'inactive' | 'expired';
    nextBillingDate?: string;
  } | null;
}

export function useCredits() {
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuthState();

  const fetchCredits = async () => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/credits');
      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }
      
      const data = await response.json();
      setCreditsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  const useCredits = async (amount: number) => {
    if (!isSignedIn) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/user/use-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to use credits');
      }

      const data = await response.json();
      setCreditsData(data);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const buyCredits = async (amount: number) => {
    if (!isSignedIn) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/payment/buy-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create credits order');
      }

      const data = await response.json();
      
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [isSignedIn]);

  return {
    creditsData,
    loading,
    error,
    useCredits,
    buyCredits,
    refetch: fetchCredits
  };
} 