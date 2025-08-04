import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import React, { createContext, useContext } from 'react';
import { viteEnv } from '../../vite.env';

// Clerk 配置 - 使用 vite 环境变量
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                       import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
                       viteEnv.VITE_CLERK_PUBLISHABLE_KEY; // 使用 vite 环境变量

// Clerk Provider 组件
interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  console.log('Clerk publishable key:', publishableKey ? 'Set' : 'Not set'); // 调试日志（不暴露实际密钥）
  
  // 检查密钥是否正确配置
  const isValidKey = publishableKey && 
                     publishableKey !== 'pk_test_your_publishable_key_here' &&
                     publishableKey !== 'pk_test_your-publishable-key' &&
                     publishableKey.startsWith('pk_');
  
  if (!isValidKey) {
    console.warn('Clerk publishable key is not properly configured. Running in demo mode.');
    // 返回一个模拟的认证上下文，让页面正常工作
    return (
      <MockClerkProvider>
        {children}
      </MockClerkProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}

// 模拟的认证上下文
const MockAuthContext = createContext({
  isSignedIn: false,
  isLoaded: true,
  isLoading: false,
  user: null,
  email: null
});

// 模拟的 Clerk Provider，当没有配置密钥时使用
function MockClerkProvider({ children }: { children: React.ReactNode }) {
  const mockAuthValue = {
    isSignedIn: false,
    isLoaded: true,
    isLoading: false,
    user: null,
    email: null
  };
  
  return (
    <MockAuthContext.Provider value={mockAuthValue}>
      {children}
    </MockAuthContext.Provider>
  );
}

// 导出配置供其他地方使用
export const clerkConfig = {
  publishableKey,
};

// 导出常用的 hooks
export const useAuthState = () => {
  try {
    const { isSignedIn, isLoaded } = useAuth();
    return { isSignedIn, isLoaded, isLoading: !isLoaded };
  } catch (error) {
    // Try mock context first
    try {
      const mockAuth = useContext(MockAuthContext);
      return { 
        isSignedIn: mockAuth.isSignedIn, 
        isLoaded: mockAuth.isLoaded, 
        isLoading: mockAuth.isLoading 
      };
    } catch {
      // If not within any provider, return default values
      return { isSignedIn: false, isLoaded: true, isLoading: false };
    }
  }
};

export const useCurrentUser = () => {
  try {
    const { user, isLoaded } = useUser();
    return { 
      user,
      email: user?.emailAddresses?.[0]?.emailAddress,
      isLoaded 
    };
  } catch (error) {
    // Try mock context first
    try {
      const mockAuth = useContext(MockAuthContext);
      return { 
        user: mockAuth.user, 
        email: mockAuth.email, 
        isLoaded: mockAuth.isLoaded 
      };
    } catch {
      // If not within any provider, return default values
      return { 
        user: null, 
        email: null, 
        isLoaded: true 
      };
    }
  }
};

export const useAuthToken = () => {
  try {
    const { getToken } = useAuth();
    return { getToken };
  } catch (error) {
    // Return mock function when not in Clerk context
    return { getToken: () => Promise.resolve(null) };
  }
}; 