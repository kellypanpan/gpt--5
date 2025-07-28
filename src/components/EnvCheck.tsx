import React from 'react';
import { config } from '@/lib/config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Settings } from 'lucide-react';

export const EnvCheck: React.FC = () => {
  const isConfigured = config.validate();
  
  if (isConfigured) {
    return null; // 如果配置正确，不显示任何内容
  }
  
  return (
    <Card className="max-w-2xl mx-auto mb-6 border-yellow-200 bg-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Settings className="h-5 w-5" />
          Environment Setup Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm text-yellow-700">
            Some environment variables are missing or not configured properly.
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={config.clerk.publishableKey && config.clerk.publishableKey !== 'pk_test_your-publishable-key' ? 'default' : 'secondary'}>
              {config.clerk.publishableKey && config.clerk.publishableKey !== 'pk_test_your-publishable-key' ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              Clerk
            </Badge>
            <span className="text-xs text-muted-foreground">
              VITE_CLERK_PUBLISHABLE_KEY
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={config.openai.apiKey ? 'default' : 'secondary'}>
              {config.openai.apiKey ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              OpenAI
            </Badge>
            <span className="text-xs text-muted-foreground">
              VITE_OPENAI_API_KEY
            </span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Please check <code className="bg-muted px-1 rounded">ENVIRONMENT_SETUP.md</code> for setup instructions.
        </div>
      </CardContent>
    </Card>
  );
}; 