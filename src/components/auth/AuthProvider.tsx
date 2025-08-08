import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { getUserByClerkId, getUserStats } from '@/lib/supabase';

// 扩展的用户数据接口
interface ExtendedUser {
  // Clerk 用户数据
  clerkId: string;
  email?: string;
  name?: string;
  imageUrl?: string;
  
  // Supabase 用户数据
  id?: string;
  credits?: number;
  isSubscribed?: boolean;
  subscriptionType?: 'pro' | 'creator' | 'lifetime';
  subscriptionExpiresAt?: string;
  
  // 用户统计
  stats?: {
    totalGenerations: number;
    creditsUsed: number;
    favoriteTools: string;
    generationsThisMonth: number;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: ExtendedUser | null;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  refreshUserData: async () => {}
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const [userData, setUserData] = useState<ExtendedUser | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  // 获取用户完整数据的函数
  const fetchUserData = async (clerkUserId: string): Promise<ExtendedUser | null> => {
    try {
      // 从 Supabase 获取用户数据
      const supabaseUser = await getUserByClerkId(clerkUserId);
      
      if (!supabaseUser) {
        console.log('User not found in Supabase, may need to create user profile');
        return null;
      }

      // 获取用户统计数据
      const stats = await getUserStats(supabaseUser.id);

      return {
        clerkId: clerkUserId,
        email: clerkUser?.emailAddresses[0]?.emailAddress,
        name: clerkUser?.fullName,
        imageUrl: clerkUser?.imageUrl,
        id: supabaseUser.id,
        credits: supabaseUser.credits,
        isSubscribed: supabaseUser.is_subscribed,
        subscriptionType: supabaseUser.subscription_type,
        subscriptionExpiresAt: supabaseUser.subscription_expires_at,
        stats: {
          totalGenerations: stats.total_generations,
          creditsUsed: stats.credits_used,
          favoriteTools: stats.favorite_tool,
          generationsThisMonth: stats.generations_this_month
        }
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // 刷新用户数据
  const refreshUserData = async () => {
    if (!clerkUser) return;
    
    setIsLoadingUserData(true);
    try {
      const fullUserData = await fetchUserData(clerkUser.id);
      setUserData(fullUserData);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setIsLoadingUserData(false);
    }
  };

  // 当 Clerk 用户状态改变时，获取完整用户数据
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      refreshUserData();
    } else if (isLoaded && !isSignedIn) {
      setUserData(null);
      setIsLoadingUserData(false);
    }
  }, [isLoaded, isSignedIn, clerkUser?.id]);

  // Clerk 还在加载时的加载界面
  if (!isLoaded || (isSignedIn && isLoadingUserData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/80">Loading user data...</p>
        </div>
      </div>
    );
  }

  const contextValue: AuthContextType = {
    isAuthenticated: isSignedIn || false,
    user: userData,
    isLoading: !isLoaded || isLoadingUserData,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 使用认证上下文的 Hook
export const useAuthStatus = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthStatus must be used within an AuthProvider');
  }
  return context;
};

// 向后兼容的简化 Hook
export const useAuth = () => {
  const { isAuthenticated, user } = useAuthStatus();
  return {
    isSignedIn: isAuthenticated,
    user: user ? {
      id: user.clerkId,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl
    } : null
  };
}; 