import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Zap, Check, Mail, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { UNIFIED_PRICING_PLANS, getPlanInfo } from "@/config/pricing";

interface CompactAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  showSubscription?: boolean; // New prop to show subscription option
}

export const CompactAuthModal = ({ isOpen, onClose, onSuccess, showSubscription = false }: CompactAuthModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof UNIFIED_PRICING_PLANS>('yearly'); // Default to yearly for best value

  const handleGoogleAuth = async (subscribe = false, plan?: keyof typeof UNIFIED_PRICING_PLANS) => {
    setIsLoading(true);
    setError('');
    try {
      const redirectUrl = subscribe && plan 
        ? `${window.location.origin}/auth/callback?subscribe=true&plan=${plan}`
        : `${window.location.origin}/auth/callback`;
        
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Google auth error:', error);
      const errorMsg = error.message || 'Google login failed, please try again';
      setError(errorMsg);
      
      // 如果是严重错误，跳转到错误页面
      if (error.status >= 500) {
        window.location.href = `/error?error=google_auth_error&description=${encodeURIComponent(errorMsg)}&from=compact_auth_modal`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubAuth = async (subscribe = false, plan?: keyof typeof UNIFIED_PRICING_PLANS) => {
    setIsLoading(true);
    setError('');
    try {
      const redirectUrl = subscribe && plan 
        ? `${window.location.origin}/auth/callback?subscribe=true&plan=${plan}`
        : `${window.location.origin}/auth/callback`;
        
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Github auth error:', error);
      const errorMsg = error.message || 'GitHub login failed, please try again';
      setError(errorMsg);
      
      // 如果是严重错误，跳转到错误页面
      if (error.status >= 500) {
        window.location.href = `/error?error=github_auth_error&description=${encodeURIComponent(errorMsg)}&from=compact_auth_modal`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (subscribe = false, plan?: keyof typeof UNIFIED_PRICING_PLANS) => {
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    try {
      const redirectUrl = subscribe && plan 
        ? `${window.location.origin}/auth/callback?subscribe=true&plan=${plan}`
        : `${window.location.origin}/auth/callback`;
        
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      if (error) throw error;
      setError('Magic link sent! Check your email.');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || 'Failed to send email, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribeWithPlan = (plan: keyof typeof UNIFIED_PRICING_PLANS) => {
    // Use Google auth for subscription (most popular)
    handleGoogleAuth(true, plan);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0">
        <div className="grid lg:grid-cols-5 min-h-[500px]">
          {/* Left side - Login Form */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-gray-900" />
                <span className="text-xl font-bold">GPT-5 AI</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to unlock GPT-5's full power</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                error.includes('sent') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {error}
              </div>
            )}

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button 
                onClick={() => handleGoogleAuth(false)}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button 
                onClick={() => handleGithubAuth(false)}
                disabled={isLoading}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login */}
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailAuth()}
              />
              <Button 
                onClick={() => handleEmailAuth(false)}
                disabled={isLoading || !email}
                className="w-full bg-gray-900 hover:bg-gray-800"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Magic Link
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>

          {/* Right side - Pro Plans */}
          <div className="lg:col-span-3 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-white/10 to-transparent" />

            <div className="relative z-10">
              <Badge className="bg-gray-700 text-gray-200 mb-6 w-fit">
                🚀 Choose Your Pro Plan
              </Badge>

              <h3 className="text-3xl font-bold mb-4">
                Upgrade to Pro
              </h3>
              <p className="text-gray-300 text-lg mb-8">
                Unlock unlimited conversations and all premium features. Choose the plan that works best for you.
              </p>

              {/* Pricing Options */}
              <div className="space-y-4 mb-6">
                {Object.entries(UNIFIED_PRICING_PLANS).map(([planKey, plan]) => (
                  <div
                    key={planKey}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPlan === planKey
                        ? 'border-white bg-white/10 shadow-lg'
                        : 'border-gray-600 bg-white/5 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPlan(planKey as keyof typeof UNIFIED_PRICING_PLANS)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 left-4">
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    {plan.savings && (
                      <div className="absolute -top-2 right-4">
                        <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                          {plan.savings}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPlan === planKey
                            ? 'border-white bg-white'
                            : 'border-gray-400'
                        }`}>
                          {selectedPlan === planKey && (
                            <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {plan.period}
                          </div>
                          <div className="text-gray-300 text-sm">${plan.price}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-white">${plan.dailyCost}</div>
                        <div className="text-gray-300 text-sm">per day</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscribe Button */}
              <Button
                onClick={() => handleSubscribeWithPlan(selectedPlan)}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Crown className="w-5 h-5 mr-3" />
                Sign In & Subscribe - ${UNIFIED_PRICING_PLANS[selectedPlan].price}
              </Button>

              {/* Trust Signals */}
              <div className="mt-6 text-center">
                <div className="text-gray-400 text-sm">
                  🔒 7-day money-back guarantee • Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};