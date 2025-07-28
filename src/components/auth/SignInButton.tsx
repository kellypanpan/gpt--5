import React from 'react';
import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

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
  return (
    <ClerkSignInButton mode="modal">
      <Button variant={variant} size={size} className={className}>
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
    </ClerkSignInButton>
  );
}; 