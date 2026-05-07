import { useState, useEffect } from 'react';

const AUTH_KEY = 'natpac_participant_id';

export function useAuth() {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      const stored = localStorage.getItem(AUTH_KEY);
      setParticipantId(stored || null);
      setIsLoading(false);
    };
    load();
  }, []);

  const login = async (name: string) => {
    localStorage.setItem(AUTH_KEY, name);
    setParticipantId(name);
  };

  const logout = async () => {
    localStorage.removeItem(AUTH_KEY);
    setParticipantId(null);
  };

  return {
    participantId,
    isLoggedIn: !!participantId,
    isLoading,
    login,
    logout,
  };
}

