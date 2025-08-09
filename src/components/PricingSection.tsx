import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      description: "Perfect for GPT-5 content creators and professionals",
      credits: "500 credits/month",
      icon: Zap,
      features: [
        "500 credits monthly",
        "All tools access",
        "Standard support",
        "Export capabilities",
        "Basic analytics",
      ],
      cta: "Start Pro Plan",
      variant: "outline" as const,
    },
    {
      name: "Creator",
      price: "$39",
      period: "/month",
      description: "Best GPT-5 AI platform for content creators and businesses",
      credits: "Unlimited usage",
      icon: Crown,
      features: [
        "Unlimited credits",
        "All tools + priority",
        "Batch processing",
        "Premium image generation",
        "Advanced analytics",
        "Priority support",
        "API access",
      ],
      cta: "Go Creator",
      variant: "hero" as const,
      popular: true,
    },
    {
      name: "Lifetime",
      price: "$299",
      period: "one-time",
      description: "Lifetime access to GPT-5 AI - Buy once, use forever",
      credits: "Lifetime access",
      icon: Star,
      features: [
        "Lifetime unlimited access",
        "All current & future tools",
        "No monthly fees",
        "VIP support",
        "Beta feature access",
        "Commercial license",
      ],
      cta: "Get Lifetime",
      variant: "premium" as const,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">GPT-5 AI Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your GPT-5 AI needs. All plans include full access to our comprehensive GPT-5 AI suite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                    {plan.credits}
                  </Badge>
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

                  <Button variant={plan.variant} size="lg" className="w-full">
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 30-day money-back guarantee
          </p>
          <div className="text-sm text-muted-foreground/60">
            No free tiers. Professional tools for serious users only.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;