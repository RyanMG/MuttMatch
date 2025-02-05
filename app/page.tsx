'use client';

import { ReactNode } from "react";

function TextBlock({children}: {children: ReactNode}) {
  return (
    <p className="text-md font-medium text-indigo-800 pb-2">
      {children}
    </p>
  );
}

/**
 *
 */
export default function Home(): ReactNode {
  return (
    <div className="flex-1 h-full overflow-y-scroll">
      <div className="flex flex-col items-center justify-center p-2 overflow-y-scroll">

        <section className="flex flex-col border border-orange-400 rounded-lg w-[350px] md:w-[550px] md:mt-10 px-6 py-4">
          <h1 className="text-2xl font-extrabold text-indigo-950 pb-2">Welcome to MuttMatch!</h1>
          <TextBlock>
            {`
              You love doggos! We love doggos! We help match good dogs with in need of homes with good people who have them.
            `}
          </TextBlock>

          <TextBlock>
            {`
              By aggregating adoption data from shelters, rescue centers and foster owners around the country, we are able to build the world's largest database of dogs in need.
              You can use our services to search for the perfect dog, matching you and your family's needs.
            `}
          </TextBlock>

          <TextBlock>
            {`
              Once you register for an account, you will be given access to our search platform. So what are you waiting for? Find your new best friend today!
            `}
          </TextBlock>
        </section>
      </div>
    </div>
  );
}
