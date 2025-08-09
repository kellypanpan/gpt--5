import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { SimpleAuthModal } from '@/components/modals/SimpleAuthModal';

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <LogIn className="h-4 w-4 mr-2" />
        Sign In
      </Button>
      <SimpleAuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}; 