import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, getCurrentUser, getUserProfile, createUserProfile, updateUserCredits } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User } from '@/lib/supabase';

export interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  checkAccess: (feature: string) => boolean;
  useCredits: (amount: number) => boolean;
}

const AuthContext = createContext<AuthState | null>(null);

const FEATURES_CREDITS = {
  'chat': 1,
  'image-generation': 3,
  'pdf-analysis': 2,
  'script-generation': 2,
  'writing-tool': 2,
  'prompt-lab': 1
};

const FREE_PLAN_LIMITS = {
  credits: 10,
  maxChatsPerDay: 3,
  features: ['chat', 'writing-tool']
};

const PRO_PLAN_FEATURES = {
  unlimited: true,
  features: ['chat', 'image-generation', 'pdf-analysis', 'script-generation', 'writing-tool', 'prompt-lab']
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        loadUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setSupabaseUser(session.user);
        await handleAuthUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setSupabaseUser(null);
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthUser = async (authUser: SupabaseUser) => {
    try {
      let userProfile = await getUserProfile(authUser.id);
      
      if (!userProfile) {
        // Create new user profile
        userProfile = await createUserProfile(authUser);
      }
      
      setUser(userProfile);
    } catch (error) {
      console.error('Error handling auth user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      const userProfile = await getUserProfile(userId);
      setUser(userProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update credits in database if credits changed
      if (updates.credits !== undefined && user.id) {
        try {
          await updateUserCredits(user.id, updates.credits);
        } catch (error) {
          console.error('Error updating user credits:', error);
        }
      }
    }
  };

  const checkAccess = (feature: string): boolean => {
    if (!user) return false;

    if (user.plan === 'pro' || user.plan === 'business') {
      return PRO_PLAN_FEATURES.features.includes(feature);
    }

    if (user.plan === 'free') {
      return FREE_PLAN_LIMITS.features.includes(feature) && user.credits > 0;
    }

    return false;
  };

  const useCredits = (amount: number): boolean => {
    if (!user) return false;

    if (user.plan === 'pro' || user.plan === 'business') {
      return true; // Unlimited for paid plans
    }

    if (user.credits >= amount) {
      updateUser({ credits: user.credits - amount });
      return true;
    }

    return false;
  };

  const authState: AuthState = {
    user,
    supabaseUser,
    isAuthenticated: !!user && !!supabaseUser,
    isLoading,
    login,
    logout,
    updateUser,
    checkAccess,
    useCredits
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper hooks
export const useRequireAuth = () => {
  const { isAuthenticated, user } = useAuth();
  return { isAuthenticated, user, requiresAuth: !isAuthenticated };
};

export const useFeatureAccess = (feature: string) => {
  const { checkAccess, user } = useAuth();
  const hasAccess = checkAccess(feature);
  const requiredCredits = FEATURES_CREDITS[feature as keyof typeof FEATURES_CREDITS] || 1;
  
  return {
    hasAccess,
    requiredCredits,
    userCredits: user?.credits || 0,
    canAfford: user ? user.credits >= requiredCredits : false,
    isPaidPlan: user?.plan === 'pro' || user?.plan === 'business'
  };
};