'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useLocalStorage from "@hooks/useLocalStorage";
import {
  BOOKMARKS_STORAGE_TOKEN
} from "@constants/bookmarks";
import {
  TDogID,
  TDog,
  TDogBookmark
} from "@definitions/dogs";

/**
 * CONTEXT
 */
const BookmarkContext = createContext<{
  getBookmarks: () => TDogBookmark;
  clearBookmarks: () => void;
  addBookmark: (dog: TDog) => void;
  removeBookmark: (dogId: TDogID) => void;
}>({
  getBookmarks: () => ({} as TDogBookmark),
  clearBookmarks: () => {},
  addBookmark: () => {},
  removeBookmark: () => {}
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

  const [bookmarks, setBookmarks] = useState<TDogBookmark>({} as TDogBookmark);

  /**
   * Initial load
   */
  useEffect(() => {
    (async ():Promise<void> => {
      const bookmarksFromStorage = await getStorageItem(BOOKMARKS_STORAGE_TOKEN) as TDogBookmark;

      if (!bookmarksFromStorage) {
        setStorageItem(BOOKMARKS_STORAGE_TOKEN, {} as TDogBookmark);
      }

      setBookmarks(bookmarksFromStorage || {});
    })()
  }, []);

  const getBookmarks = (): TDogBookmark => {
    return bookmarks;
  }

  const clearBookmarks = (): void => {
    removeStorageItem(BOOKMARKS_STORAGE_TOKEN);
    setBookmarks({} as TDogBookmark);
  }

  const addBookmark = (dog: TDog): void => {
    setBookmarks({
      ...bookmarks,
      [dog.id]: dog
    });
    setStorageItem(BOOKMARKS_STORAGE_TOKEN, bookmarks);
  }

  const removeBookmark = (dogId: TDogID): TDog => {
    const { [dogId]: dogToRemove, ...remainingBookmarks } = bookmarks;
    setBookmarks(remainingBookmarks);
    setStorageItem(BOOKMARKS_STORAGE_TOKEN, bookmarks);
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
