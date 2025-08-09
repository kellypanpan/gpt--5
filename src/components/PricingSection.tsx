import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { UNIFIED_PRICING_PLANS, PRO_FEATURES } from "@/config/pricing";

const PricingSection = () => {
  // Free plan features
  const FREE_FEATURES = [
    "Limited daily conversations",
    "Basic GPT-5 access", 
    "Community support"
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for trying out GPT-5 AI",
      dailyCost: "Free forever",
      icon: Sparkles,
      features: FREE_FEATURES,
      cta: "Get Started Free",
      variant: "outline" as const,
      href: "/chat"
    },
    {
      name: "Pro",
      price: `$${UNIFIED_PRICING_PLANS.yearly.price}`,
      period: "/year",
      description: "Unlimited access to all GPT-5 AI features",
      dailyCost: `Only $${UNIFIED_PRICING_PLANS.yearly.dailyCost}/day`,
      icon: Crown,
      features: PRO_FEATURES,
      cta: "Upgrade to Pro",
      variant: "hero" as const,
      popular: true,
      savings: "Save 70%",
      href: "/pricing"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Simple, Transparent Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free, then upgrade to Pro for unlimited access to GPT-5's full potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={index}
                className={`relative bg-card/30 backdrop-blur-sm border-border/20 hover:bg-card/50 transition-smooth ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground border-0">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <Badge variant="outline" className="mt-2">
                    {plan.dailyCost}
                  </Badge>
                  {plan.savings && (
                    <Badge className="mt-1 bg-green-500 text-white">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={plan.href}>
                    <Button variant={plan.variant} size="lg" className="w-full">
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            🔒 7-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
          <Link 
            to="/pricing" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            View all pricing options (Monthly, Quarterly, Yearly) →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;