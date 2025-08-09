import { useState, useEffect } from 'react';
import { useAuth, useFeatureAccess } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/modals/AuthModal';
import { PricingModal } from '@/components/modals/PricingModal';

interface ProtectedFeatureProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showUpgradeIfNeeded?: boolean;
}

export const ProtectedFeature = ({ 
  feature, 
  children, 
  fallback,
  showUpgradeIfNeeded = true 
}: ProtectedFeatureProps) => {
  const { isAuthenticated, login } = useAuth();
  const { hasAccess, isPaidPlan, canAfford } = useFeatureAccess(feature);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Auto-trigger modals based on user state
  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (showUpgradeIfNeeded && !hasAccess && !isPaidPlan && !canAfford) {
      setShowPricingModal(true);
    }
  }, [isAuthenticated, hasAccess, isPaidPlan, canAfford, showUpgradeIfNeeded]);

  const handleAuthSuccess = (userData: any) => {
    const newUser = {
      id: userData.email,
      email: userData.email,
      name: userData.name || userData.email.split('@')[0],
      plan: 'free' as const,
      credits: 10,
      subscriptionStatus: 'active' as const,
      provider: userData.provider || 'email'
    };
    
    login(newUser);
    setShowAuthModal(false);
    
    // After login, if still no access, show pricing
    if (showUpgradeIfNeeded && !hasAccess) {
      setTimeout(() => setShowPricingModal(true), 500);
    }
  };

  const handlePlanSelect = (plan: 'free' | 'pro' | 'business') => {
    if (plan === 'free') {
      setShowPricingModal(false);
      return;
    }

    // Simulate plan upgrade
    if (plan === 'pro') {
      const { updateUser } = useAuth();
      updateUser({ 
        plan: 'pro',
        credits: -1, // Unlimited 
        subscriptionStatus: 'active',
        subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      });
    }
    
    setShowPricingModal(false);
  };

  // Show fallback if user can't access feature
  if (!isAuthenticated || (!hasAccess && !isPaidPlan && !canAfford)) {
    return (
      <>
        {fallback || (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {!isAuthenticated ? 'Login Required' : 'Upgrade Required'}
            </h3>
            <p className="text-gray-400 text-center mb-4">
              {!isAuthenticated 
                ? 'Please log in to access this feature'
                : 'This feature requires a Pro plan or more credits'
              }
            </p>
          </div>
        )}
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
        
        <PricingModal
          isOpen={showPricingModal}
          onClose={() => setShowPricingModal(false)}
          onSelectPlan={handlePlanSelect}
        />
      </>
    );
  }

  return <>{children}</>;
};

// Higher-order component version
export const withProtection = (feature: string, showUpgradeIfNeeded = true) => {
  return function <T extends {}>(Component: React.ComponentType<T>) {
    return function ProtectedComponent(props: T) {
      return (
        <ProtectedFeature feature={feature} showUpgradeIfNeeded={showUpgradeIfNeeded}>
          <Component {...props} />
        </ProtectedFeature>
      );
    };
  };
};

// Hook for manual protection checks
export const useProtection = (feature: string) => {
  const { isAuthenticated } = useAuth();
  const { hasAccess, isPaidPlan, canAfford } = useFeatureAccess(feature);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const checkAndEnforce = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return false;
    }

    if (!hasAccess && !isPaidPlan && !canAfford) {
      setShowPricingModal(true);
      return false;
    }

    return true;
  };

  return {
    checkAndEnforce,
    showAuthModal,
    setShowAuthModal,
    showPricingModal,
    setShowPricingModal,
    isProtected: !isAuthenticated || (!hasAccess && !isPaidPlan && !canAfford)
  };
};