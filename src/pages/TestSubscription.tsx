import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/hooks/useCredits";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { Badge } from "@/components/ui/badge";
import { Coins, TestTube } from "lucide-react";

const TestSubscription = () => {
  const { isAuthenticated } = useAuth();
  const { creditsData, loading, useCredits: deductCredits } = useCredits();
  const [testResult, setTestResult] = useState<string>("");

  const testUseCredits = async () => {
    try {
      const result = await deductCredits(1);
      setTestResult(`Success! Used 1 credit. Remaining: ${result.currentCredits}`);
    } catch (error) {
      setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <SEOHead 
          title="Subscription Test - GPT-5 AI"
          description="Test the subscription system"
        />
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to test subscription</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SEOHead 
        title="Subscription Test - GPT-5 AI"
        description="Test the subscription system"
      />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <TestTube className="h-8 w-8 text-primary" />
            Subscription System Test
          </h1>
          <p className="text-muted-foreground">
            Test the credits functionality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credits Display */}
          <div>
            <CreditsDisplay />
          </div>

          {/* Test Controls */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-primary" />
                  Test Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button 
                    onClick={testUseCredits}
                    disabled={loading}
                    className="w-full"
                  >
                    Test Use Credits (1 credit)
                  </Button>
                </div>

                {testResult && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{testResult}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                ) : creditsData ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Credits:</span>
                      <Badge variant="outline">{creditsData.currentCredits}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Plan:</span>
                      <Badge variant="outline" className="capitalize">{creditsData.plan}</Badge>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubscription; 