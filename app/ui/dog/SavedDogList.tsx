'use client';

import { useBookmarkContext } from "@context/bookmarkProvider";
import { ReactNode } from "react";
import NoSavedDogs from "@ui/dog/NoSavedDogs";
import DogCard from "@ui/dog-search/DogCard";

export default function SavedDogs(): ReactNode {
  const { getBookmarks } = useBookmarkContext();
  const bookmarks = getBookmarks();

  if (Object.keys(bookmarks).length === 0) {
    return <NoSavedDogs />
  }

  return (
    <>
      {Object.keys(bookmarks).map((dogId) => (
        <DogCard key={dogId} dog={bookmarks[dogId]} />
      ))}
    </>
  );
}
