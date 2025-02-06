'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import {TDog} from '@definitions/dogs';
import { getDogById } from "@api/dogs";
import {useRouter} from 'next/navigation';
import PageLoading from "@ui/common/PageLoading";

export default function DogProfile({
  dogId,
  dogParams
}: {
  dogId: TDog['id']
  dogParams: TDog
}): ReactNode {

  const hasDogParams = dogParams && Object.keys(dogParams).length > 0;
  const [isLoading, setIsLoading] = useState<boolean>(!hasDogParams);
  const error = useRef<string | null>(null);
  const dog = useRef<TDog | null>(hasDogParams ? dogParams : null);
  const router = useRouter();

  const getAgeText = (age: TDog['age'] | undefined) => {
    if (!age) return "";
    if (age < 3) {
      return "and has a lot of puppy energy!";
    }
    if (age >= 3 && age < 10) {
      return "and is in good health.";
    }
    return "which means she has needs some extra love for her aging bones.";
  }

  useEffect(() => {
    (async () => {
      if (!hasDogParams) {
        const resp = await getDogById(dogId);

        if (resp === "Unauthorized") {
          router.push('/logout');
          return;
        }

        if ('error' in resp) {
          error.current = resp.error;
        } else {
          dog.current = resp;
        }
        setIsLoading(false);
      }
    })();
  }, [hasDogParams, dogId, error.current, dog.current]);

  if (isLoading) {
    return <PageLoading />
  }

  if (error.current || !dog.current) {
    return (
      <section className="flex flex-col items-center pt-5 h-full">
        <h1 className="text-2xl font-bold text-indigo-950">Who let the dog out?</h1>
        <p className="text-indigo-950">We were unable to locate this dog! Get them microchipped at your local vet!</p>
      </section>
    );
  }

  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={dog.current?.img || "/missing.svg"}
          alt={dog.current?.name || "Missing Dog"}
          width={200}
          height={200}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-2">
          <h2 className="text-4xl text-indigo-950">Say hello to</h2>
          <h2 className="text-4xl font-bold text-orange-500">{dog.current?.name}!</h2>
        </div>

        <p className="text-md text-indigo-950">{dog.current?.name} is an adorable {dog.current?.breed}, looking for a forever home!</p>
        <p className="text-md text-indigo-950">{dog.current?.name} is {dog.current?.age}, {getAgeText(dog.current?.age)}</p>
        <p className="text-md text-indigo-950">{dog.current?.name} is living in the {dog.current?.zip_code} area!</p>
      </div>
    </div>
  );
}
