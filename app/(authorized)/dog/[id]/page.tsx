import PageWrapper from "@ui/common/PageWrapper";
import { ReactNode } from "react";
import DogProfile from "@ui/dog/DogProfile";
import {TDog} from '@definitions/dogs';

export default async function DogPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{
    id?: string
    name?: string
    breed?: string
    age?: string
    zip_code?: string
    image?: string
  }> | undefined
}): Promise<ReactNode> {

  const pathParams = await params;
  const dogParams = await searchParams;

  let dog: TDog | { error: string } = {} as TDog;

  if (dogParams && Object.keys(dogParams).length > 0) {
    dog = {
      id: dogParams.id as TDog['id'],
      name: dogParams.name as TDog['name'],
      breed: dogParams.breed as TDog['breed'],
      age: Number(dogParams.age) as TDog['age'],
      zip_code: dogParams.zip_code as TDog['zip_code'],
      img: dogParams.image as TDog['img']
    } as TDog;
  }

  return (
    <PageWrapper pageTitle="Doggo Profile">
      <DogProfile dogId={pathParams.id} dogParams={dog} />
    </PageWrapper>
  );
}
