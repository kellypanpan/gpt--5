import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Crown, ArrowRight, X } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { useSearchParams } from "react-router-dom";
import { UNIFIED_PRICING_PLANS, PRO_FEATURES } from "@/config/pricing";

const Pricing = () => {
  const { isAuthenticated: isSignedIn } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof UNIFIED_PRICING_PLANS>('yearly');
  const [searchParams] = useSearchParams();
  const [showCancelMessage, setShowCancelMessage] = useState(false);

  // Check for payment cancellation
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    
    if (paymentStatus === 'cancelled') {
      setShowCancelMessage(true);
      
      // Auto-hide cancel message after 5 seconds
      setTimeout(() => {
        setShowCancelMessage(false);
      }, 5000);
    }
  }, [searchParams]);

  // Free plan features
  const FREE_FEATURES = [
    "Limited daily conversations",
    "Basic GPT-5 access",
    "Community support"
  ];

  const handleSubscribe = async (planKey: keyof typeof UNIFIED_PRICING_PLANS) => {
    if (!isSignedIn) {
      // Show auth modal or redirect to login
      window.location.href = '/chat'; // This will trigger auth modal
      return;
    }

    const plan = UNIFIED_PRICING_PLANS[planKey];
    
    try {
      // TODO: Integrate with Creem checkout
      if (plan.creemUrl) {
        window.location.href = plan.creemUrl;
      } else {
        // Fallback - redirect to existing upgrade flow
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to start subscription. Please try again.');
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="GPT-5 AI Pricing - Choose Your Plan"
        description="Choose between Free and Pro plans for GPT-5 AI. Get unlimited conversations and premium features starting at just $0.19/day."
        keywords="gpt-5 pricing, gpt-5 subscription, ai tools pricing, gpt-5 pro plan"
      />
      <div className="bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 pt-20">
          {/* Payment Cancelled Banner */}
          {showCancelMessage && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-orange-600" />
                  <div>
                    <h3 className="font-semibold text-orange-800">Payment Cancelled</h3>
                    <p className="text-orange-700">No worries! You can try again anytime.</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCancelMessage(false)}
                  className="text-orange-600 hover:text-orange-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, then upgrade to Pro for unlimited access to GPT-5's full potential
            </p>
          </div>

          {/* Free vs Pro Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gray-600" />
                  Free Plan
                </CardTitle>
                <CardDescription>Perfect for trying out GPT-5 AI</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                  <div className="text-sm text-muted-foreground">forever</div>
                </div>

                <div className="space-y-3">
                  {FREE_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.location.href = '/chat'}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-primary/50 shadow-lg">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                Most Popular
              </Badge>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Pro Plan
                </CardTitle>
                <CardDescription>Unlimited access to everything</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">
                    ${UNIFIED_PRICING_PLANS[selectedPlan].price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {UNIFIED_PRICING_PLANS[selectedPlan].period} • Only ${UNIFIED_PRICING_PLANS[selectedPlan].dailyCost}/day
                  </div>
                  {selectedPlan === 'yearly' && (
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Save 70% vs Monthly
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {PRO_FEATURES.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  onClick={() => handleSubscribe(selectedPlan)}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Pro Plan Options */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Choose Your Pro Plan Duration</h2>
              <p className="text-muted-foreground">Longer plans offer better value per day</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(UNIFIED_PRICING_PLANS).map(([planKey, plan]) => (
                <Card 
                  key={planKey}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPlan === planKey 
                      ? 'border-primary bg-primary/5 shadow-md' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedPlan(planKey as keyof typeof UNIFIED_PRICING_PLANS)}
                >
                  <CardContent className="p-6 text-center relative">
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs">
                        Most Popular
                      </Badge>
                    )}
                    {plan.savings && (
                      <Badge className="absolute -top-2 right-2 bg-green-500 text-white text-xs">
                        {plan.savings}
                      </Badge>
                    )}
                    
                    <div className="mb-4">
                      <div className={`w-6 h-6 rounded-full border-2 mx-auto mb-3 ${
                        selectedPlan === planKey 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedPlan === planKey && (
                          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-lg">{plan.period}</h3>
                      <p className="text-2xl font-bold text-primary">${plan.price}</p>
                      <p className="text-sm text-muted-foreground">
                        ${plan.dailyCost}/day
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What's the difference between Free and Pro?</h3>
                <p className="text-muted-foreground">
                  Free users get limited daily conversations with GPT-5. Pro users get unlimited conversations, 
                  all premium AI tools, priority support, and advanced features.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can cancel your Pro subscription at any time. No long-term commitments required.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  We offer a 7-day money-back guarantee for all Pro plans. If you're not satisfied, 
                  we'll refund your payment in full.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Why choose yearly over monthly?</h3>
                <p className="text-muted-foreground">
                  The yearly plan costs only $0.19/day compared to $0.67/day for monthly - that's 70% savings! 
                  It's less than a cup of coffee per day for unlimited GPT-5 access.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Payments Section */}
          <div className="max-w-3xl mx-auto mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Bank-Level Security Guarantee</h2>
            <p className="text-muted-foreground mb-6">
              We partner with Creem to handle all payments, ensuring your transaction is secure and worry-free.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Credit Card Security</h4>
                <p className="text-sm text-muted-foreground">
                  Your sensitive data like credit card numbers is processed directly by Creem's secure servers. We never store this information on our platform.
                </p>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Data Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All data transmission, from your browser to the payment processor, is protected by TLS 1.2+ encryption.
                </p>
              </div>
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Compliance Standards</h4>
                <p className="text-sm text-muted-foreground">
                  Our payment process is compliant with PCI DSS, the most stringent security standard in the payment industry.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="text-center mt-16 pt-8 border-t border-border">
            <div className="flex justify-center items-center space-x-8 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              🔒 Secure payments • 7-day money-back guarantee • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;