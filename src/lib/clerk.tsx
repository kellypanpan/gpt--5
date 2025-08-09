import React, { createContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Shim provider - simply render children (we don't use Clerk anymore)
export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// Dummy config to keep existing imports working
export const clerkConfig = {
  publishableKey: null as unknown as string,
};

// Hooks compatible with previous API
export const useAuthState = () => {
  const { isAuthenticated, isLoading } = useAuth();
  return { isSignedIn: isAuthenticated, isLoaded: !isLoading, isLoading };
};

export const useCurrentUser = () => {
  const { user, isLoading } = useAuth();
  return { user, email: user?.email, isLoaded: !isLoading } as const;
};

export const useAuthToken = () => {
  // Return a function to fetch current access token from Supabase
  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };
  return getToken;
}; 