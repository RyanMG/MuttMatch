'use client';

import { useAuthContext } from "@context/authProvider";

export default function UserOptions() {
  const {isLoading, userDetails} = useAuthContext();

  return (
    <div className="flex flex row items-center">
      {isLoading &&
        <p className="">...</p>
      }
      {!isLoading &&
        <p className="">{`Hello ${userDetails?.name ? userDetails.name : "guest"}!`}</p>
      }
    </div>
  );
}