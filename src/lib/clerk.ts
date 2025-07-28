import { useAuth, useUser } from '@clerk/clerk-react';

// Hook for getting auth token (在组件中使用)
export function useAuthToken() {
  const { getToken } = useAuth();
  
  return async () => {
    try {
      return await getToken();
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  };
}

// Hook for user info
export function useCurrentUser() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  
  return {
    user,
    isLoaded,
    isSignedIn,
    email: user?.emailAddresses[0]?.emailAddress || null,
    fullName: user?.fullName || null,
    imageUrl: user?.imageUrl || null,
  };
}

// Hook for authentication state
export function useAuthState() {
  const { isSignedIn, isLoaded } = useAuth();
  
  return {
    isSignedIn: !!isSignedIn,
    isLoaded,
    isLoading: !isLoaded,
  };
}

// Clerk认证工具类 (用于非React环境)
export const authUtils = {
  // 获取认证token (这个需要在组件内部使用useAuthToken hook)
  async getAuthToken(): Promise<string | null> {
    // 这个方法需要在React组件中通过useAuthToken hook调用
    console.warn('authUtils.getAuthToken should be replaced with useAuthToken hook');
    return null;
  },
};