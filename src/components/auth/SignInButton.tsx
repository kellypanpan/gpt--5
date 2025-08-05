import React from 'react';
import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { clerkConfig } from '@/lib/clerk';

interface SignInButtonProps {
  variant?: 'default' | 'outline' | 'hero';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ 
  variant = 'default', 
  size = 'default',
  className = ''
}) => {
  // Check if we have a valid Clerk key
  const isValidKey = clerkConfig.publishableKey && 
                     clerkConfig.publishableKey !== 'pk_test_your_publishable_key_here' &&
                     clerkConfig.publishableKey !== 'pk_test_your-publishable-key' &&
                     clerkConfig.publishableKey.startsWith('pk_') &&
                     clerkConfig.publishableKey.length > 50;

  // If no valid key, show a mock sign-in button
  if (!isValidKey) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={className}
        onClick={() => {
          console.log('Sign-in clicked (demo mode)');
          alert('Demo Mode: Please configure your Clerk publishable key to enable authentication.');
        }}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Sign In (Demo)
      </Button>
    );
  }

  return (
    <ClerkSignInButton mode="modal">
      <Button variant={variant} size={size} className={className}>
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    </ClerkSignInButton>
  );
}; 