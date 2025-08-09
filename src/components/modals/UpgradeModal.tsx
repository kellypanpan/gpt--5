import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Star, Check, ArrowRight, Sparkles, FileText, MessageSquare, Infinity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UNIFIED_PRICING_PLANS, PRO_FEATURES, PLATFORM_STATS } from "@/config/pricing";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade?: () => void;
  remainingCredits: number;
}

export const UpgradeModal = ({ isOpen, onClose, onUpgrade, remainingCredits }: UpgradeModalProps) => {
  const { isAuthenticated, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof UNIFIED_PRICING_PLANS>('yearly'); // Default to yearly for best value

  const handleCreemCheckout = (plan: keyof typeof UNIFIED_PRICING_PLANS) => {
    if (!isAuthenticated) {
      // This would trigger auth modal - fallback to existing flow for now
      onUpgrade?.();
      return;
    }

    // TODO: Replace with actual Creem checkout URL
    const creemUrl = UNIFIED_PRICING_PLANS[plan].creemUrl;
    
    if (!creemUrl) {
      // Fallback to existing upgrade flow
      onUpgrade?.();
      return;
    }

    // Add user info to checkout URL when Creem is configured
    const urlWithParams = `${creemUrl}?email=${encodeURIComponent(user.email)}&plan=${plan}`;
    window.location.href = urlWithParams;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0">
        <div className="grid lg:grid-cols-5 min-h-[500px]">
          {/* Left side - Upgrade Form */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold">Upgrade to Pro</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Unlock Full Power</h2>
              <p className="text-gray-600">Get unlimited access to all GPT-5 features</p>
            </div>

            {/* Credit Warning */}
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-red-800">Credits running low</span>
              </div>
              <p className="text-red-700 text-sm">
                You have <span className="font-bold">{remainingCredits}</span> conversations remaining
              </p>
            </div>

            {/* Upgrade Button */}
            <div className="space-y-4 mb-6">
              <Button 
                onClick={() => handleCreemCheckout(selectedPlan)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <Crown className="w-5 h-5 mr-3" />
                Upgrade to Pro - ${UNIFIED_PRICING_PLANS[selectedPlan].price}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>

              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Maybe Later
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              7-day money-back guarantee • Cancel anytime
            </p>
          </div>

          {/* Right side - Value Proposition */}
          <div className="lg:col-span-3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white flex flex-col justify-center relative overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/10 to-transparent" />

            <div className="relative z-10">
              <Badge className="bg-orange-500 text-white mb-6 w-fit">
                🔥 Limited Time - 50% OFF
              </Badge>

              <h3 className="text-3xl font-bold mb-4">
                Why Upgrade to Pro?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Join 50,000+ professionals using GPT-5 AI for unlimited conversations and premium tools.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {PLATFORM_STATS.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-lg">What's included:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PRO_FEATURES.map((benefit, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Options */}
              <div className="space-y-4 mb-6">
                {Object.entries(UNIFIED_PRICING_PLANS).map(([planKey, plan]) => (
                  <div
                    key={planKey}
                    className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPlan === planKey
                        ? 'border-white bg-white/10 shadow-lg'
                        : 'border-blue-300/30 bg-white/5 hover:border-blue-300/50'
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
                            : 'border-blue-300'
                        }`}>
                          {selectedPlan === planKey && (
                            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {plan.period}
                          </div>
                          <div className="text-blue-200 text-sm">${plan.price}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-white">${plan.dailyCost}</div>
                        <div className="text-blue-200 text-sm">per day</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Signals */}
              <div className="mt-6 text-center">
                <div className="flex justify-center space-x-1 text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-blue-200 text-sm">
                  4.9/5 rating • 95% user satisfaction • Secure payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};