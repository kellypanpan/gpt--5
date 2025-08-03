import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import React from 'react';
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
  console.log('Clerk publishable key:', publishableKey); // 调试日志
  
  if (!publishableKey || publishableKey === 'pk_test_your-publishable-key') {
    console.warn('Clerk publishable key is not set or is using test key');
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}

// 导出配置供其他地方使用
export const clerkConfig = {
  publishableKey,
};

// 导出常用的 hooks
export const useAuthState = () => {
  const { isSignedIn, isLoaded } = useAuth();
  return { isSignedIn, isLoaded };
};

export const useCurrentUser = () => {
  const { user } = useUser();
  return user;
};

export const useAuthToken = () => {
  const { getToken } = useAuth();
  return { getToken };
}; 