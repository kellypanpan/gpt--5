import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, RefreshCw, Home, ArrowLeft, Copy, CheckCircle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import Layout from '@/components/Layout';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  
  const error = searchParams.get('error');
  const errorCode = searchParams.get('code');
  const errorDescription = searchParams.get('description');
  const from = searchParams.get('from') || 'unknown';
  
  // 常见错误类型和解决方案
  const getErrorInfo = (error: string | null) => {
    const errorMap: { [key: string]: { title: string; description: string; solutions: string[] } } = {
      'access_denied': {
        title: 'Access Denied',
        description: 'You denied access to your account or the login was cancelled.',
        solutions: [
          'Try logging in again and grant permission',
          'Check if popup blockers are enabled',
          'Make sure cookies are enabled'
        ]
      },
      'invalid_request': {
        title: 'Invalid Request',
        description: 'There was an issue with the login request.',
        solutions: [
          'Clear your browser cache and cookies',
          'Try a different browser',
          'Check if JavaScript is enabled'
        ]
      },
      'server_error': {
        title: 'Server Error',
        description: 'Our authentication server encountered an error.',
        solutions: [
          'Please try again in a few minutes',
          'Check if our services are operational',
          'Contact support if the problem persists'
        ]
      },
      'configuration_error': {
        title: 'Configuration Error',
        description: 'There is a misconfiguration in our authentication setup.',
        solutions: [
          'This is likely a temporary issue',
          'Our team has been notified',
          'Please try again later'
        ]
      },
      'network_error': {
        title: 'Network Error',
        description: 'Unable to connect to authentication services.',
        solutions: [
          'Check your internet connection',
          'Try disabling VPN if you\'re using one',
          'Check if corporate firewall is blocking the request'
        ]
      }
    };
    
    return errorMap[error || ''] || {
      title: 'Authentication Error',
      description: error || 'An unknown error occurred during authentication.',
      solutions: [
        'Try refreshing the page',
        'Clear your browser cache',
        'Try a different browser or device',
        'Contact support if the problem continues'
      ]
    };
  };
  
  const errorInfo = getErrorInfo(error);
  
  const copyErrorDetails = async () => {
    const details = {
      error,
      errorCode,
      errorDescription,
      from,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(details, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const handleRetry = () => {
    // 清除URL参数并重定向到chat页面
    window.location.href = '/chat';
  };
  
  return (
    <Layout>
      <SEOHead 
        title="Authentication Error - GPT-5 AI"
        description="An error occurred during authentication"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-background to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg border-red-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <CardTitle className="text-2xl text-red-800 mb-2">
                {errorInfo.title}
              </CardTitle>
              
              <p className="text-gray-600">
                {errorInfo.description}
              </p>
              
              {from !== 'unknown' && (
                <Badge variant="outline" className="mt-2 w-fit mx-auto">
                  From: {from}
                </Badge>
              )}
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* 错误详情 */}
              {(error || errorCode || errorDescription) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Error Details</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyErrorDetails}
                      className="text-xs"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Details
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2 text-sm font-mono">
                    {error && (
                      <div>
                        <span className="text-gray-500">Error:</span>{' '}
                        <span className="text-red-600">{error}</span>
                      </div>
                    )}
                    {errorCode && (
                      <div>
                        <span className="text-gray-500">Code:</span>{' '}
                        <span className="text-red-600">{errorCode}</span>
                      </div>
                    )}
                    {errorDescription && (
                      <div>
                        <span className="text-gray-500">Description:</span>{' '}
                        <span className="text-red-600">{errorDescription}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 解决方案 */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Try These Solutions:</h3>
                <ul className="space-y-2">
                  {errorInfo.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={handleRetry}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  onClick={() => window.history.back()}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
              
              {/* 联系支持 */}
              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">
                  Still having trouble?
                </p>
                <Button 
                  variant="link" 
                  onClick={() => window.open('mailto:support@gpt-5ai.com')}
                  className="text-blue-600"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* 系统状态信息 */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-4 text-xs text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span>Timestamp: {new Date().toLocaleString()}</span>
              <span>•</span>
              <span>Session ID: {Math.random().toString(36).substr(2, 9)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ErrorPage;