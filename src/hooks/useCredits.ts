import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface CreditsData {
  currentCredits: number;
  plan: 'free' | 'pro' | 'business';
}

export function useCredits() {
  const { isAuthenticated: isSignedIn, user } = useAuth();
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        setCreditsData({ currentCredits: 0, plan: 'free' });
      } else {
        const { data, error } = await supabase
          .from('users')
          .select('credits, plan')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;
        setCreditsData({ currentCredits: data.credits, plan: data.plan });
      }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [isSignedIn]);

  const useCredits = async (amount: number) => {
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase.rpc('deduct_credits', {
      user_id: user.id,
      amount
    });
    if (error) throw error;
    await fetchCredits();
    return data;
  };

  return { creditsData, loading, error, refetch: fetchCredits, useCredits };
} 