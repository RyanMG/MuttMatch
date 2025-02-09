'use client';

import { ReactNode, useEffect, useState } from "react";
import { getDogMatchById } from "@api/dogs";
import PageLoading from "@ui/common/PageLoading";
import { useBookmarkContext } from "@context/bookmarkProvider";
import { TDog } from "@definitions/dogs";

export default function DogMatchResults(): ReactNode {
  const { bookmarks } = useBookmarkContext();
  const [match, setMatch] = useState<TDog | null>(null);

  useEffect(() => {
    (async() => {
      if (bookmarks && Object.keys(bookmarks).length > 0) {
        const response = await getDogMatchById(Object.keys(bookmarks));
        if (response === "Unauthorized") {
          return "Unauthorized";
        }

        if ('error' in response) {
          return response;
        }

        setMatch(response);
      }
    })();
  }, [bookmarks, getDogMatchById]);

  if (!match) {
    return <PageLoading />
  }

  return (
    <div>
      <p className="text-lg text-indigo-950">{match.name}</p>
    </div>
  )
}
