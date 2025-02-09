'use client';

import { ReactNode, useEffect, useState } from "react";
import { getDogMatchById } from "@api/dogs";
import PageLoading from "@ui/common/PageLoading";
import { useBookmarkContext } from "@context/bookmarkProvider";
import { TDog } from "@definitions/dogs";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DogMatchResults(): ReactNode {
  const { bookmarks } = useBookmarkContext();
  const [match, setMatch] = useState<TDog | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async() => {
      if (bookmarks && Object.keys(bookmarks).length > 0) {
        const response = await getDogMatchById(Object.keys(bookmarks));
        if (response === "Unauthorized") {
          router.push('/logout');
          return;
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
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-2xl font-bold text-indigo-950">We found your perfect Mutt Match!</h1>
      <section className="flex flex-row gap-2 my-4">
        <Image
          src={match.img}
          alt={match.name}
          width={300}
          height={300}
        />
      </section>
      <p className="text-2xl font-bold text-orange-500">{`Meet ${match.name}!`}</p>
      <p className="text-md italic text-center text-indigo-950">{`${match.name!} the lovable ${match.breed!} is ready to meet you in the ${match.zip_code!} area.`}</p>
    </div>
  )
}
