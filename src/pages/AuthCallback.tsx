import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { UNIFIED_PRICING_PLANS } from '@/config/pricing';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate(`/error?error=${encodeURIComponent(error.code || 'auth_error')}&description=${encodeURIComponent(error.message)}&from=auth_callback`);
          return;
        }

        if (data.session) {
          console.log('Auth success');
          
          // Check if this was a subscription flow
          const shouldSubscribe = searchParams.get('subscribe') === 'true';
          const planKey = searchParams.get('plan');
          
          if (shouldSubscribe && planKey && planKey in UNIFIED_PRICING_PLANS) {
            const plan = UNIFIED_PRICING_PLANS[planKey as keyof typeof UNIFIED_PRICING_PLANS];
            
            // If we have a Creem URL, redirect to it
            if (plan.creemUrl) {
              console.log('Redirecting to Creem for subscription:', planKey);
              window.location.href = plan.creemUrl;
              return;
            } else {
              // Fallback: redirect to dashboard with subscription intent
              console.log('No Creem URL configured, redirecting to dashboard');
              navigate(`/dashboard?subscribe=true&plan=${planKey}`);
              return;
            }
          }
          
          // Regular login success
          navigate('/?success=login');
        } else {
          navigate(`/error?error=no_session&description=${encodeURIComponent('No session found after authentication')}&from=auth_callback`);
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        navigate(`/error?error=auth_failed&description=${encodeURIComponent(error.message || 'Authentication failed')}&from=auth_callback`);
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold">正在登录...</h2>
        <p className="mt-2 text-gray-600">请稍候，我们正在验证您的身份</p>
      </div>
    </div>
  );
}