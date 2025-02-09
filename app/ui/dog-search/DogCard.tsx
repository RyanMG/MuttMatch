'use client';

import { ReactNode, useState } from 'react';
import { TDog } from '@definitions/dogs';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@ui/common/Button';
import { useBookmarkContext } from '@context/bookmarkProvider';
import { SyntheticEvent } from 'react';

export default function DogCard({
  dog
}: {
  dog: TDog
}): ReactNode {
  const { addBookmark, getBookmarks, removeBookmark } = useBookmarkContext();
  const bookmarks = getBookmarks();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(Boolean(bookmarks && bookmarks[dog.id]));

  return (
    <article className="w-full md:w-1/2 lg:w-1/3">
      <Link href={`/dog/${dog.id}?name=${dog.name}&breed=${dog.breed}&age=${dog.age}&zip_code=${dog.zip_code}&image=${dog.img}`}>
        <div className="border border-orange-400 rounded-lg overflow-hidden m-1 px-2 py-1">
          <div className="flex flex-row gap-2 items-center min-h-28">
            <div className="h-28 w-28 flex items-center justify-center">
              <Image
                src={dog.img}
                alt={dog.name}
                width={100}
                height={100}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-lg text-indigo-950">{dog.name}</p>
              <Button
                theme={isBookmarked ? "destroy" : "secondary"}
                size="small"
                type="button"
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (isBookmarked) {
                    const removedDog = removeBookmark(dog.id);
                    if (removedDog) {
                      setIsBookmarked(false);
                    }
                  } else {
                    addBookmark(dog);
                    setIsBookmarked(true);
                  }
                }}
              >
                <p className="text-xs">{isBookmarked ? 'Remove Bookmark' : 'Bookmark Pup'}</p>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
