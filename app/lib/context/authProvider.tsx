'use client';

import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import useStorage from "@hooks/useLocalStorage";
import {
  TLoginLoginDetails
} from "@definitions/login";
import {USER_STORAGE_TOKEN} from "@constants/auth";
import {signOut} from "@api/auth";
import {useRouter} from 'next/navigation';

/**
 * CONTEXT
 */
const AuthContext = createContext<{
  setUser: (userDetails: TLoginLoginDetails) => void;
  logout: () => void;
  userDetails: TLoginLoginDetails | null;
  isLoading: boolean;
}>({
  setUser: () => null,
  logout: () => null,
  userDetails: null,
  isLoading: true
});

/**
 * PROVIDER
 */
export default function AuthProvider ({children}:{children: ReactNode}): ReactNode {
  const router = useRouter();
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
  }, []);

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
  const logout = useCallback(async (): Promise<void> => {
    try {
      const wasLoggedOut: boolean = await signOut();
;
      if (wasLoggedOut) {
        removeStorageItem(USER_STORAGE_TOKEN);
        setUserDetails(null);
        router.push('/login');

      } else {
        // TODO: build an error notification snackbar
      }

    } catch (err) {
      console.error('err', err);
    }
  }, [removeStorageItem]);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        logout,
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
