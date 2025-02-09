'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  BOOKMARKS_STORAGE_TOKEN
} from "@constants/bookmarks";
import {
  TDogID,
  TDog,
  TDogBookmark
} from "@definitions/dogs";
import { useAuthContext } from '@context/authProvider';

/**
 * CONTEXT
 */
const BookmarkContext = createContext<{
  getBookmarks: () => TDogBookmark | null;
  clearBookmarks: () => void;
  addBookmark: (dog: TDog) => void;
  removeBookmark: (dogId: TDogID) => TDog | null;
}>({
  getBookmarks: () => null,
  clearBookmarks: () => {},
  addBookmark: () => {},
  removeBookmark: () => null
});

/**
 * PROVIDER
 */
export default function BookmarkProvider ({
  children
}:{
  children: ReactNode,
}): ReactNode {

  const {
    setStorageItem,
    getStorageItem,
    removeStorageItem
  } = useLocalStorage();

  const { userDetails, hasSession } = useAuthContext();
  const [bookmarks, setBookmarks] = useState<TDogBookmark>({} as TDogBookmark);
  const BOOKMARK_TOKEN = useRef<string | null>(null);

  /**
   * Initial load
   */
  useEffect(() => {
    (async ():Promise<void> => {
      if (hasSession) {
        BOOKMARK_TOKEN.current = `${BOOKMARKS_STORAGE_TOKEN}_${userDetails?.current?.email}`;
        const bookmarksFromStorage = await getStorageItem(BOOKMARK_TOKEN.current) as TDogBookmark;

        if (!bookmarksFromStorage) {
          setStorageItem(BOOKMARK_TOKEN.current, {} as TDogBookmark);
        }

        setBookmarks(bookmarksFromStorage || {});
      }
    })()
  }, [hasSession, userDetails]);

  useEffect(() => {
    if (!BOOKMARK_TOKEN.current) return;
    setStorageItem(BOOKMARK_TOKEN.current, bookmarks);
  }, [bookmarks]);

  const getBookmarks = (): TDogBookmark | null => {
    if (!BOOKMARK_TOKEN.current) return null;
    return bookmarks;
  }

  const clearBookmarks = (): void => {
    if (!BOOKMARK_TOKEN.current) return;

    removeStorageItem(BOOKMARK_TOKEN.current);
    setBookmarks({} as TDogBookmark);
  }

  const addBookmark = (dog: TDog): void => {
    if (!BOOKMARK_TOKEN.current) return;

    setBookmarks({
      ...bookmarks,
      [dog.id]: dog
    });
  }

  const removeBookmark = (dogId: TDogID): TDog | null => {
    if (!BOOKMARK_TOKEN.current) return null;

    const { [dogId]: dogToRemove, ...remainingBookmarks } = bookmarks;
    setBookmarks(remainingBookmarks);
    return dogToRemove;
  }

  return (
    <BookmarkContext.Provider
      value={{
        getBookmarks,
        clearBookmarks,
        addBookmark,
        removeBookmark
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

// This hook can be used to access the user info.
export function useBookmarkContext() {
  return useContext(BookmarkContext);
}
