'use client';

import { useBookmarkContext } from "@context/bookmarkProvider";
import { ReactNode } from "react";
import NoSavedDogs from "@ui/dog/NoSavedDogs";
import DogCard from "@ui/dog-search/DogCard";
import Button from "@ui/common/Button";
import { useRouter } from "next/navigation";

export default function SavedDogs(): ReactNode {
  const { bookmarks, clearBookmarks } = useBookmarkContext();
  const router = useRouter();

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

      <div className="mt-5 flex gap-2 w-full justify-center">
        <Button
          type="button"
          theme="destroy"
          onClick={clearBookmarks}
        >
          <p className="text-xs">
            Clear all saved pups
          </p>
        </Button>

        <Button
          type="button"
          theme="primary"
          onClick={() => {
            router.push('/dog/match');
          }}
        >
          <p className="text-xs">
            Find my match!
          </p>
        </Button>
      </div>

    </div>
  );
}
