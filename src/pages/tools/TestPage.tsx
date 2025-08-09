import React from 'react';
import Layout from '@/components/Layout';
import { SignInButton } from '@/components/auth/SignInButton';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnvCheck } from '@/components/EnvCheck';

const TestPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 pt-20">
        <EnvCheck />
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🧪 Component Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <UserMenu />
              </div>
            ) : (
              <SignInButton />
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TestPage; 