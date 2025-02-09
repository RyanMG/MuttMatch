import Button from '@ui/common/Button';
import { SyntheticEvent, useState, useEffect, ReactNode } from 'react';
import { useBookmarkContext } from '@context/bookmarkProvider';
import { TDog } from '@definitions/dogs';

export default function DogBookmarkBtn({
  dog
}: {
  dog: TDog
}): ReactNode {
  const { addBookmark, bookmarks, removeBookmark } = useBookmarkContext();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    setIsBookmarked(Boolean(bookmarks && bookmarks[dog.id]));
  }, [bookmarks, dog.id]);

  return (
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
  );
}
