/**
 * Manages the user's location tracking preference (Enable/Disable).
 * Stored in localStorage so it persists across sessions.
 */
import { useState, useEffect, useCallback } from 'react';

const TRACKING_KEY = 'natpac_location_tracking_enabled';

export function useLocationTracking() {
  const [trackingEnabled, setTrackingEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      const value = localStorage.getItem(TRACKING_KEY);
      // Default to enabled if not set
      setTrackingEnabled(value === null ? true : value === 'true');
      setIsLoading(false);
    };
    load();
  }, []);

  const setTracking = useCallback(async (enabled: boolean) => {
    setTrackingEnabled(enabled);
    localStorage.setItem(TRACKING_KEY, String(enabled));
  }, []);

  return { trackingEnabled, isLoading, setTracking };
}

