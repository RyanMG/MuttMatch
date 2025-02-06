import {ReactNode} from 'react';
import {TDog} from '@definitions/dogs';
import Image from 'next/image';

export default function DogCard({
  dog
}: {
  dog: TDog
}): ReactNode {
  return (
    <article className="p-1 w-full md:w-1/2 lg:w-1/3 overflow-scroll">
      <div className="border border-orange-400 rounded-lg overflow-hidden">
        <div className="flex flex-row gap-2 items-center min-h-28">
          <Image
            src={dog.img}
            alt={dog.name}
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-1">
            <p className="text-lg text-indigo-950">{dog.name}</p>
            <p className="text-indigo-950">{dog.breed}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
