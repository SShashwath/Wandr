import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export async function checkConsentStatus(participantId: string): Promise<boolean> {
  const key = `natpac_consent_${participantId}`;
  return localStorage.getItem(key) === 'true';
}

export function useConsent() {
  const { participantId } = useAuth();
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!participantId) {
        setHasConsent(false);
        setIsLoading(false);
        return;
      }
      const granted = await checkConsentStatus(participantId);
      setHasConsent(granted);
      setIsLoading(false);
    };
    load();
  }, [participantId]);

  const grantConsent = async () => {
    if (!participantId) return;
    const key = `natpac_consent_${participantId}`;
    localStorage.setItem(key, 'true');
    setHasConsent(true);
  };

  const revokeConsent = async () => {
    if (!participantId) return;
    const key = `natpac_consent_${participantId}`;
    localStorage.removeItem(key);
    setHasConsent(false);
  };

  return {
    hasConsent,
    isLoading,
    grantConsent,
    revokeConsent,
  };
}