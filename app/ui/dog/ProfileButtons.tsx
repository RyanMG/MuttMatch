'use client';

import { ReactNode } from 'react';
import Button from "@ui/common/Button";
import { useRouter } from 'next/navigation';
import DogBookmarkBtn from '@ui/dog/DogBookmarkBtn';
import { TDog } from '@definitions/dogs';

export default function ProfileButtons({
  dog
}: {
  dog: TDog
}): ReactNode {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-center gap-2 mt-2 w-full">
      <DogBookmarkBtn dog={dog} />

      <Button
        type="button"
        theme="primary"
        onClick={() => router.back()}
      >
        <p className="text-xs">Back to search results</p>
      </Button>
    </div>
  );
}
