import { useCredits } from "@/hooks/useCredits";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Coins, Crown, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function CreditsDisplay() {
  const { creditsData, loading, error } = useCredits();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
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

  const { currentCredits, plan } = creditsData;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Coins className="h-5 w-5 text-primary" />
          Credits
          <Badge variant="secondary" className="text-xs capitalize">{plan}</Badge>
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
      </CardContent>
    </Card>
  );
} 