import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { useAuthState } from "@/lib/clerk";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { isSignedIn } = useAuthState();

  const plans = [
    {
      name: "Starter",
      monthlyPrice: 19.99,
      yearlyPrice: 191.88,
      credits: 100,
      features: [
        "100 credits per month",
        "AI Writer Tool",
        "PDF Analysis Tool", 
        "Script Generator",
        "Email Support"
      ],
      popular: false
    },
    {
      name: "Pro",
      monthlyPrice: 39.99,
      yearlyPrice: 383.88,
      credits: 300,
      features: [
        "300 credits per month",
        "All Starter features",
        "Image Generator",
        "Advanced AI Agent",
        "Priority Support",
        "API Access"
      ],
      popular: true
    },
    {
      name: "Business",
      monthlyPrice: 79.99,
      yearlyPrice: 767.88,
      credits: 800,
      features: [
        "800 credits per month",
        "All Pro features",
        "Custom AI Models",
        "White-label Solutions",
        "Dedicated Support",
        "Team Management"
      ],
      popular: false
    }
  ];

  const handleSubscribe = async (planName: string) => {
    if (!isSignedIn) {
      // 重定向到登录页面
      window.location.href = '/sign-in';
      return;
    }

    try {
      const planType = `${planName.toLowerCase()}_${billingCycle}`;
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType,
          returnUrl: `${window.location.origin}/dashboard`
        })
      });

      const data = await response.json();
      
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to create subscription. Please try again.');
    }
  };

  const handleBuyCredits = async () => {
    if (!isSignedIn) {
      window.location.href = '/sign-in';
      return;
    }

    try {
      const response = await fetch('/api/payment/buy-credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 50, // 默认购买50个credits
          returnUrl: `${window.location.origin}/dashboard`
        })
      });

      const data = await response.json();
      
      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error(data.error || 'Failed to create order');
      }
    } catch (error) {
      console.error('Buy credits error:', error);
      alert('Failed to create credits order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SEOHead 
        title="GPT-5 Tools Pricing - Choose Your Plan"
        description="Choose the perfect GPT-5 tools subscription plan. Monthly and yearly options with credits-based pricing."
        keywords="gpt-5 pricing, gpt-5 subscription, ai tools pricing, gpt-5 credits"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get access to powerful GPT-5 AI tools with our flexible subscription plans
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 flex">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <Badge variant="secondary" className="ml-2 text-xs">
                Save 20%
              </Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary/50 shadow-lg scale-105' 
                  : 'border-border/50'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground border-0">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name}
                  {plan.name === 'Pro' && <Sparkles className="h-4 w-4 text-primary" />}
                  {plan.name === 'Business' && <Crown className="h-4 w-4 text-primary" />}
                </CardTitle>
                <CardDescription>
                  {plan.credits} credits per month
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Additional Credits</h3>
            <p className="text-muted-foreground mb-4">
              Need more credits? Purchase additional credits at $0.30 per credit.
            </p>
            <Button variant="outline" size="sm" onClick={handleBuyCredits}>
              Buy Extra Credits
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            All plans include access to our full suite of GPT-5 AI tools. 
            Credits are used based on tool complexity and usage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 