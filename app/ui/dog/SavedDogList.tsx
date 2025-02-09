'use client';

import { useBookmarkContext } from "@context/bookmarkProvider";
import { ReactNode } from "react";
import NoSavedDogs from "@ui/dog/NoSavedDogs";
import DogCard from "@ui/dog-search/DogCard";
import Button from "@ui/common/Button";

export default function SavedDogs(): ReactNode {
  const { bookmarks, clearBookmarks } = useBookmarkContext();

  if (!bookmarks || Object.keys(bookmarks).length === 0) {
    return <NoSavedDogs />
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap overflow-scroll no-scrollbar">
        {Object.keys(bookmarks).map((dogId) => (
          <DogCard key={dogId} dog={bookmarks[dogId]} />
        ))}
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Button
          type="button"
          theme="primary"
          onClick={clearBookmarks}
        >
          <p className="text-xs">
            Clear all saved pups
          </p>
        </Button>
      </div>

    </div>
  );
}
