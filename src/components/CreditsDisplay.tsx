import { useCredits } from "@/hooks/useCredits";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Crown, Sparkles, AlertCircle } from "lucide-react";
import { useAuthState } from "@/lib/clerk";

export function CreditsDisplay() {
  const { creditsData, loading, error, buyCredits } = useCredits();
  const { isSignedIn } = useAuthState();

  if (!isSignedIn) {
    return null;
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-2 bg-muted rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-md border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Failed to load credits</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!creditsData) {
    return null;
  }

  const { currentCredits, totalCredits, usedCredits, subscription } = creditsData;
  const usagePercentage = totalCredits > 0 ? (usedCredits / totalCredits) * 100 : 0;
  const isLowCredits = currentCredits < 10;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="h-5 w-5 text-primary" />
          Credits
          {subscription?.status === 'active' && (
            <Badge variant="secondary" className="text-xs">
              {subscription.plan}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Credits */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">
            {currentCredits}
          </div>
          <div className="text-sm text-muted-foreground">
            available credits
          </div>
        </div>

        {/* Usage Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Usage</span>
            <span>{usedCredits} / {totalCredits}</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>

        {/* Subscription Status */}
        {subscription && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Crown className="h-4 w-4 text-primary" />
              <span className="font-medium">{subscription.plan}</span>
              <Badge 
                variant={subscription.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {subscription.status}
              </Badge>
            </div>
            {subscription.nextBillingDate && (
              <div className="text-xs text-muted-foreground">
                Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {isLowCredits && (
            <div className="flex items-center gap-2 text-amber-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Low credits remaining</span>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => buyCredits(50)}
            >
              <Coins className="h-4 w-4 mr-2" />
              Buy Credits
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => window.location.href = '/pricing'}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 