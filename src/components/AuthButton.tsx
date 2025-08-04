import { useAuthState, useCurrentUser } from '@/lib/clerk';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function AuthButton() {
  const { isSignedIn, isLoading } = useAuthState();
  const { user } = useCurrentUser();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (isSignedIn && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Welcome, {user.fullName || user.emailAddresses?.[0]?.emailAddress}
        </div>
        <Button variant="outline" size="sm">
          <User className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" disabled>
      <User className="h-4 w-4 mr-2" />
      Demo Mode
    </Button>
  );
}

export function AuthStatus() {
  try {
    const { isSignedIn, isLoading } = useAuthState();
    const { user, email } = useCurrentUser();

    if (isLoading) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600">Loading authentication...</div>
        </div>
      );
    }

    if (isSignedIn && user) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm font-medium text-green-800">
            ✅ Authenticated
          </div>
          <div className="text-xs text-green-600 mt-1">
            {email || 'User signed in'}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="text-sm font-medium text-yellow-800">
          ⚠️ Demo Mode
        </div>
        <div className="text-xs text-yellow-600 mt-1">
          Authentication not configured - Tools available for demo
        </div>
      </div>
    );
  } catch (error) {
    // 如果 Clerk 完全不可用，显示友好的错误信息
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="text-sm font-medium text-orange-800">
          🔧 Demo Mode
        </div>
        <div className="text-xs text-orange-600 mt-1">
          Authentication service unavailable - Running in demo mode
        </div>
      </div>
    );
  }
}