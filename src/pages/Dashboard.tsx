import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { SEOHead } from "@/components/SEOHead";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { useAuthState } from "@/lib/clerk";
import { useCredits } from "@/hooks/useCredits";
import { Coins, Crown, History, Settings, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isSignedIn } = useAuthState();
  const { creditsData, loading } = useCredits();

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <SEOHead 
          title="Dashboard - GPT-5 Tools"
          description="Manage your GPT-5 tools subscription and credits"
        />
        <Header />
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
        title="Dashboard - GPT-5 Tools"
        description="Manage your GPT-5 tools subscription and credits"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subscription and monitor your usage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Credits Card */}
          <div className="lg:col-span-1">
            <CreditsDisplay />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/tools/writer">
                    <Button variant="outline" className="w-full h-16 flex-col gap-2">
                      <Sparkles className="h-5 w-5" />
                      AI Writer
                    </Button>
                  </Link>
                  <Link to="/tools/pdf">
                    <Button variant="outline" className="w-full h-16 flex-col gap-2">
                      <Crown className="h-5 w-5" />
                      PDF Analyzer
                    </Button>
                  </Link>
                  <Link to="/tools/script">
                    <Button variant="outline" className="w-full h-16 flex-col gap-2">
                      <History className="h-5 w-5" />
                      Script Generator
                    </Button>
                  </Link>
                  <Link to="/tools/image">
                    <Button variant="outline" className="w-full h-16 flex-col gap-2">
                      <Coins className="h-5 w-5" />
                      Image Generator
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Info */}
            {creditsData?.subscription && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Subscription Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plan</span>
                    <Badge variant="secondary">{creditsData.subscription.plan}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status</span>
                    <Badge 
                      variant={creditsData.subscription.status === 'active' ? 'default' : 'secondary'}
                    >
                      {creditsData.subscription.status}
                    </Badge>
                  </div>
                  {creditsData.subscription.nextBillingDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Next Billing</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(creditsData.subscription.nextBillingDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="pt-4">
                    <Link to="/pricing">
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Subscription
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                ) : creditsData ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Credits Used</span>
                      <span className="text-sm">{creditsData.usedCredits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Balance</span>
                      <span className="text-sm font-bold text-primary">{creditsData.currentCredits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Monthly Allocation</span>
                      <span className="text-sm">{creditsData.totalCredits}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No usage data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 