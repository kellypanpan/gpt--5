import { SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { useAuthState, useCurrentUser } from '@/lib/clerk';
import { Button } from '@/components/ui/button';

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
          Welcome, {user.fullName || user.email}
        </div>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <Button variant="outline">
        Sign In
      </Button>
    </SignInButton>
  );
}

export function AuthStatus() {
  const { isSignedIn, isLoading } = useAuthState();
  const { user, email } = useCurrentUser();

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  if (isSignedIn && user) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="text-sm font-medium text-green-800">
          ✅ Authenticated
        </div>
        <div className="text-xs text-green-600 mt-1">
          {email}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="text-sm font-medium text-yellow-800">
        ⚠️ Not authenticated
      </div>
      <div className="text-xs text-yellow-600 mt-1">
        Please sign in to use AI tools
      </div>
    </div>
  );
}