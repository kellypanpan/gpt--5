import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-react';
import React from 'react';

// Clerk 配置
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                       import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Clerk Provider 组件
interface ClerkProviderWrapperProps {
  children: React.ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  if (!publishableKey) {
    console.warn('Clerk publishable key is not set');
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