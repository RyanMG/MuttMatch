import Button from "@ui/common/Button";
import { useRouter } from 'next/navigation';
import { ReactNode } from "react";

export default function NoSavedDogs(): ReactNode {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
    <section className="w-3/4 md:w-1/2 border border-indigo-950 rounded-lg p-4 flex flex-col items-center justify-center">
      <p className="text-center text-indigo-950 text-lg font-bold mb-4">No saved dogs. Why not look through the list of pups in need of home?</p>
      <Button
        theme="primary"
        type="button"
        onClick={() => {
          router.push('/dogs?page=1');
        }}
      >
        Search Dogs
      </Button>
    </section>
  </div>
  );
}
