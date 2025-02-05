'use client';

import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import useStorage from "@hooks/useLocalStorage";
import {
  TLoginLoginDetails
} from "@definitions/login";
import {USER_STORAGE_TOKEN} from "@constants/auth";

/**
 * CONTEXT
 */
const AuthContext = createContext<{
  setUser: (userDetails: TLoginLoginDetails) => void;
  signOut: () => void;
  userDetails: TLoginLoginDetails | null;
  isLoading: boolean;
}>({
  setUser: () => null,
  signOut: () => null,
  userDetails: null,
  isLoading: true
});

/**
 * PROVIDER
 */
export default function AuthProvider ({children}:{children: ReactNode}): ReactNode {
  const {
    setStorageItem,
    getStorageItem,
    removeStorageItem
  } = useStorage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<TLoginLoginDetails | null>(null);

  /**
   * Initial load
   */
  useEffect(() => {
    (async ():Promise<void> => {
      const user = await getStorageItem(USER_STORAGE_TOKEN);
      if (user && 'name' in user) {
        setUserDetails(user);
      }

      setIsLoading(false);
    })()
  }, [getStorageItem]);

  /**
   * User signs in, set their details in local storage
   */
  const setUser = useCallback(async (userDetails: TLoginLoginDetails): Promise<void> => {
    setStorageItem(USER_STORAGE_TOKEN, userDetails);
    setUserDetails(userDetails);
  }, [setStorageItem]);

  /**
   * User signs out
   */
  const signOut = useCallback(async (): Promise<void> => {
    removeStorageItem(USER_STORAGE_TOKEN);
    setUserDetails(null);
  }, [removeStorageItem]);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        signOut,
        userDetails,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// This hook can be used to access the user info.
export function useAuthContext() {
  return useContext(AuthContext);
}
