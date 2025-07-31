import { ClerkProvider } from '@clerk/clerk-react';

// Clerk 配置
export const clerkConfig = {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
                  import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
};

// Clerk Provider 组件
export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerkConfig.publishableKey!}>
      {children}
    </ClerkProvider>
  );
}