import { X, Check, Star, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'free' | 'pro' | 'business') => void;
}

export const PricingModal = ({ isOpen, onClose, onSelectPlan }: PricingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-700">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <X className="w-4 h-4 text-gray-300" />
          </button>
          
          <div className="p-8">
            <DialogHeader className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                🎯 Choose Your AI Journey
              </h2>
              <p className="text-gray-300 text-lg">
                Join 50,000+ professionals who trust GPT-5 Tools
              </p>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Free Plan */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">STARTER</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white">FREE</div>
                    <div className="text-gray-400 text-sm">Forever</div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      10 AI generations
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Basic AI chat
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Community support
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onSelectPlan('free')}
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Get Started Free
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-500 hover:border-blue-400 transition-all duration-300 scale-105">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center">
                    <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                    PRO PLAN
                  </h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white">$19</div>
                    <div className="text-blue-300 font-medium">≈ $0.63 per day</div>
                    <div className="text-gray-400 text-sm">💡 Less than your morning coffee</div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center text-gray-200">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Unlimited GPT-5 conversations
                    </div>
                    <div className="flex items-center text-gray-200">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      All premium AI tools
                    </div>
                    <div className="flex items-center text-gray-200">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Priority processing
                    </div>
                    <div className="flex items-center text-gray-200">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      Export & share conversations
                    </div>
                    <div className="flex items-center text-gray-200">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      24/7 Priority support
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onSelectPlan('pro')}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium"
                  >
                    🚀 Start Pro Trial
                  </Button>
                  <div className="text-xs text-gray-400 mt-2">No credit card needed</div>
                </div>
              </div>

              {/* Business Plan */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">BUSINESS</h3>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white">$49</div>
                    <div className="text-gray-300">≈ $1.63 per day</div>
                    <div className="text-gray-400 text-sm">🎯 Less than a lunch meal</div>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Everything in Pro
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      API access & integrations
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      White-label solutions
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Dedicated account manager
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      SLA guarantee
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onSelectPlan('business')}
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    📞 Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            {/* Value Comparison */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                💡 Put It In Perspective
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-400">☕ Starbucks</div>
                  <div className="text-white font-medium">$5.50/day</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">🚗 Uber ride</div>
                  <div className="text-white font-medium">$12/day</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">🍔 Lunch</div>
                  <div className="text-white font-medium">$8/day</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">📺 Netflix</div>
                  <div className="text-white font-medium">$1.33/day</div>
                </div>
                <div className="text-center border border-blue-500 rounded-lg p-2 bg-blue-500/10">
                  <div className="text-blue-300">💎 GPT-5 Pro</div>
                  <div className="text-blue-200 font-bold">$0.63/day</div>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="flex justify-center items-center space-x-6 mt-6 text-sm text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                💳 30-day money-back guarantee
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                🔒 Secure payment by Stripe
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};