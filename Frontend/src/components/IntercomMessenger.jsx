import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import { getAuth } from '@/lib/util';
import { useContext } from 'react';
import { USER_PROFILE_CONTEXT } from '@/contexts';

export default function IntercomMessenger() {
  const { userProfile } = useContext(USER_PROFILE_CONTEXT);
  const { userId } = getAuth();

  useEffect(() => {
    // Initialize Intercom with basic settings
    Intercom({
      app_id: 'r7vtaj19',
    });

    // If user is logged in, update with user details
    if (userProfile) {
      Intercom('update', {
        user_id: userId,
        name: userProfile.name,
        email: userProfile.email,
        created_at: Math.floor(new Date(userProfile.createdAt).getTime() / 1000), // Convert to Unix timestamp
      });
    }

    // Cleanup on unmount
    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
    };
  }, [userProfile, userId]); // Re-run when user profile changes

  return null;
} 