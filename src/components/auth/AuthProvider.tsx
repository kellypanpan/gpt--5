import React from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// 认证状态Hook
export const useAuthStatus = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  
  return {
    isAuthenticated: isSignedIn,
    user: user ? {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: user.fullName,
      imageUrl: user.imageUrl
    } : null
  };
}; 