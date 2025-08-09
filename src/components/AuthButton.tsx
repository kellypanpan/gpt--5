import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function AuthButton() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Welcome, {user.name || user.email}
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
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-sm text-blue-600">Loading authentication...</div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="text-sm font-medium text-green-800">✅ Authenticated</div>
        <div className="text-xs text-green-600 mt-1">{user.email}</div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="text-sm font-medium text-yellow-800">⚠️ Demo Mode</div>
      <div className="text-xs text-yellow-600 mt-1">Authentication not configured</div>
    </div>
  );
}