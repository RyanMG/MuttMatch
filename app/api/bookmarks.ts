'use client';

import useLocalStorage from "@hooks/useLocalStorage";
import {
  BOOKMARKS_STORAGE_TOKEN
} from "@constants/bookmarks";
import {
  TDogID,
  TDog,
  TDogBookmark
} from "@definitions/dogs";

class DogBookmarks {
  private bookmarks: TDogBookmark
  private email: string | null

  constructor() {
    this.bookmarks = {};
    this.email = null;
  }

  getBookmarks(): TDogBookmark {
    return this.bookmarks;
  }

  clearBookmarks(): void {
    const { removeStorageItem } = useLocalStorage();
    removeStorageItem(`${BOOKMARKS_STORAGE_TOKEN}_${this.email}`);
    this.bookmarks = {};
  }

  addBookmark(dog: TDog): void {
    this.bookmarks[dog.id] = dog;
  }

  removeBookmark(dogId: TDogID): void {
    delete this.bookmarks[dogId];
  }

  async getBookmarksFromStorage(email:string): Promise<TDogBookmark | { error: string }> {
    const { getStorageItem, setStorageItem } = useLocalStorage();
    this.email = email;
    const bookmarks = await getStorageItem(`${BOOKMARKS_STORAGE_TOKEN}_${this.email}`) as TDogBookmark;

    if (!bookmarks) {
      setStorageItem(`${BOOKMARKS_STORAGE_TOKEN}_${this.email}`, {} as TDogBookmark);
    }

    this.bookmarks = bookmarks;

    return bookmarks || {};
  }

  async saveBookmarksToStorage(): Promise<void> {
    const { setStorageItem } = useLocalStorage();
    return setStorageItem(BOOKMARKS_STORAGE_TOKEN, this.bookmarks);
  }
}

const dogBookmarks = new DogBookmarks();
export default dogBookmarks;
