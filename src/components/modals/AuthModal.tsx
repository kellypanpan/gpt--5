import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Users, Shield, Zap, Check, X, Mail, ArrowRight, Github, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out GPT-5 AI",
    features: [
      "3 conversations per day",
      "Basic AI writing tools", 
      "Community support",
      "Standard response speed"
    ]
  },
  {
    name: "Pro",
    price: "$19",
    period: "month",
    description: "For power users and professionals",
    features: [
      "Unlimited conversations",
      "All premium AI tools",
      "Priority support",
      "Faster response time",
      "Export conversations",
      "Advanced prompts library",
      "No usage limits"
    ],
    popular: true,
    highlighted: true
  },
  {
    name: "Business", 
    price: "$49",
    period: "month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Admin dashboard",
      "Custom integrations",
      "Priority processing",
      "Advanced analytics",
      "Dedicated support"
    ]
  }
];

const SOCIAL_PROOF_STATS = [
  { label: "Active users today", value: "2,847", icon: Users },
  { label: "Conversations generated", value: "156K", icon: Star },
  { label: "Success rate", value: "99.9%", icon: Shield }
];

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Google auth error:', error);
      setError(error.message || 'Google login failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Github auth error:', error);
      setError(error.message || 'GitHub login failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      setError('Magic link sent to your email! Check your inbox.');
      // Don't close modal immediately, let user see the success message
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl lg:max-h-[90vh] max-h-screen w-full lg:w-auto overflow-y-auto p-0 lg:rounded-lg rounded-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 lg:p-6 lg:rounded-t-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              🚀 Unlock GPT-5 AI's Full Power
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-center text-lg">
              More powerful than ChatGPT Plus, cheaper price • $0.63/day = price of a coffee
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left side - Auth */}
          <div className="lg:w-2/5 p-4 lg:p-6 lg:border-r border-gray-200">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
                  Limited Time 50% OFF
                </Badge>
                <p className="text-sm text-gray-600">Get started in 30 seconds, no credit card required</p>
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
              <div className="space-y-3">
                <Button 
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3"
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
                  onClick={handleGithubAuth}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full py-3 border-gray-300"
                  size="lg"
                >
                  <Github className="w-5 h-5 mr-3" />
                  Continue with GitHub
                </Button>
              </div>

              <div className="relative">
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
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-3"
                />
                <Button 
                  onClick={handleEmailAuth}
                  disabled={isLoading || !email}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  size="lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Magic Link
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to our 
                <span className="underline">Terms of Service</span> and 
                <span className="underline">Privacy Policy</span>
              </p>
            </div>
          </div>

          {/* Right side - Value Prop */}
          <div className="lg:w-3/5 p-4 lg:p-6">
            {/* Social Proof */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {SOCIAL_PROOF_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <Icon className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                    <div className="font-bold text-lg text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Pricing Plans */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-4">Choose Your Plan</h3>
              <div className="grid gap-4">
                {PRICING_PLANS.map((plan, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-xl p-4 relative transition-all hover:shadow-lg ${
                      plan.highlighted 
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-4 bg-orange-500 text-white">
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h4 className="font-semibold text-lg">{plan.name}</h4>
                            <p className="text-gray-600 text-sm">{plan.description}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-gray-500">/{plan.period}</span>
                        </div>
                        
                        <div className="mt-3">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                            {plan.features.slice(0, 4).map((feature, i) => (
                              <div key={i} className="flex items-center text-sm text-gray-600">
                                <Check className="w-3 h-3 text-green-500 mr-1" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full lg:w-auto lg:ml-4">
                        <Button 
                          variant={plan.highlighted ? "default" : "outline"}
                          className={`w-full ${plan.highlighted ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                          size="lg"
                        >
                          {plan.name === "Free" ? "Start Free" : "Upgrade Now"}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Pro User Exclusive</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>• 95% of users upgrade after trial</div>
                <div>• 7-day money-back guarantee</div>
                <div>• Supports PayPal/Stripe payments</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};