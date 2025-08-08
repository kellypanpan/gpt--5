import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, CreditCard, TrendingUp, Zap } from 'lucide-react';
import { useAuthStatus } from '@/components/auth/AuthProvider';

export const UserProfileCard: React.FC = () => {
  const { user, isLoading, refreshUserData } = useAuthStatus();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Please sign in to view profile</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={user.name || 'User'} 
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-lg">{user.name || 'User'}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshUserData}
            className="text-xs"
          >
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 积分信息 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Credits</span>
            </div>
            <span className="text-2xl font-bold text-yellow-500">
              {user.credits ?? 'N/A'}
            </span>
          </div>
        </div>

        {/* 订阅状态 */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-green-500" />
            <span className="font-medium">Subscription</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={user.isSubscribed ? "default" : "secondary"}>
              {user.isSubscribed ? user.subscriptionType?.toUpperCase() || 'SUBSCRIBED' : 'FREE'}
            </Badge>
            {user.subscriptionExpiresAt && (
              <span className="text-xs text-muted-foreground">
                Expires: {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* 使用统计 */}
        {user.stats && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Usage Stats</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {user.stats.totalGenerations}
                </div>
                <div className="text-xs text-muted-foreground">Total Generations</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {user.stats.generationsThisMonth}
                </div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">
                  {user.stats.creditsUsed}
                </div>
                <div className="text-xs text-muted-foreground">Credits Used</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-green-500 capitalize">
                  {user.stats.favoriteTools}
                </div>
                <div className="text-xs text-muted-foreground">Favorite Tool</div>
              </div>
            </div>
          </div>
        )}

        {/* Supabase 连接状态 */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Database Status</span>
            <Badge variant={user.id ? "default" : "destructive"} className="text-xs">
              {user.id ? "Connected" : "No Data"}
            </Badge>
          </div>
          {user.id && (
            <p className="text-xs text-muted-foreground mt-1">
              User ID: {user.id.slice(0, 8)}...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;