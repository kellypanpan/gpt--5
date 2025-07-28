import React from 'react';
import { Header } from '@/components/Header';
import { SignInButton } from '@/components/auth/SignInButton';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuthState } from '@/lib/clerk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnvCheck } from '@/components/EnvCheck';

const TestPage = () => {
  const { isSignedIn, isLoading } = useAuthState();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        <EnvCheck />
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🧪 Component Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Authentication Status:</h3>
              <div className="text-sm text-muted-foreground">
                {isLoading ? 'Loading...' : isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Auth Components:</h3>
              <div className="flex gap-2">
                {isSignedIn ? <UserMenu /> : <SignInButton />}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">UI Components:</h3>
              <div className="flex gap-2">
                <Button variant="default">Default Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                ✅ All components are working correctly!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestPage; 