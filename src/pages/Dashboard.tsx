import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/hooks/useCredits";
import { Coins, Crown, History, Settings, Sparkles, CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { UNIFIED_PRICING_PLANS } from "@/config/pricing";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const { creditsData, loading } = useCredits();
  const [searchParams] = useSearchParams();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [successPlan, setSuccessPlan] = useState<string>('');

  // Check for payment success
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const planKey = searchParams.get('plan');
    
    if (paymentStatus === 'success' && planKey && planKey in UNIFIED_PRICING_PLANS) {
      setShowPaymentSuccess(true);
      setSuccessPlan(planKey);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowPaymentSuccess(false);
      }, 5000);
    }
  }, [searchParams]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <SEOHead 
          title="Dashboard - GPT-5 AI"
          description="Manage your GPT-5 AI subscription and credits"
        />
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to access your dashboard</h1>
            <Link to="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SEOHead 
        title="Dashboard - GPT-5 AI"
        description="Manage your GPT-5 AI subscription and credits"
      />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Payment Success Banner */}
        {showPaymentSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">
                  Payment Successful! 🎉
                </h3>
                <p className="text-green-700">
                  Welcome to GPT-5 AI Pro ({UNIFIED_PRICING_PLANS[successPlan as keyof typeof UNIFIED_PRICING_PLANS]?.period})! 
                  You now have unlimited access to all features.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Your Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CreditsDisplay />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/tools/writer"><Button variant="outline" className="w-full">Open Writer</Button></Link>
                <Link to="/chat"><Button variant="outline" className="w-full">Open Chat</Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 