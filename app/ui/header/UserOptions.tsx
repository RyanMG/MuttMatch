'use client';

import { useAuthContext } from "@context/authProvider";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
      <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
    </svg>
  );
}

/**
 *
 */
export default function UserOptions() {
  const {isLoading, hasSession, userDetails, logout} = useAuthContext();
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const router = useRouter();

  const toggleUserDropdown = (shouldOpen?: boolean) => {
    setShowUserDropdown(shouldOpen ?? !showUserDropdown);
  }

  return (
    <div className="flex flex row items-center">

      <div className="cursor-pointer select-none">
        {isLoading &&
          <p className="text-white">...</p>
        }
        {!isLoading &&
          <>
            {hasSession &&
              <div className="flex flex-row items-center gap-1" onClick={() => toggleUserDropdown()}>
                <UserIcon />
                <p className="text-white">{`Hello ${userDetails?.current?.name}!`}</p>
              </div>
            }
            {!hasSession &&
              <Link href="/login">
                <p className="text-white">Log in to access the app</p>
              </Link>
            }
          </>
        }
      </div>

      <div>
        <div className={`fixed left-0 top-10 h-full w-full bg-black ${showUserDropdown ? 'flex opacity-50' : 'hidden opacity-0'}`} onClick={() => toggleUserDropdown()} />
        <div className={`transition duration-300 ease-in-out flex justify-center fixed top-10 right-1 bg-white border border-orange-500 border-t-0 drop-shadow-md pl-4 pr-6 py-4 ${showUserDropdown ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col gap-2">
            <p className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => {
              toggleUserDropdown(false);
              router.push('/user')
            }}>Owner Profile</p>
            <p className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => {
              toggleUserDropdown(false);
              router.push('/user/settings')
            }}>Settings</p>
            <p className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={() => {
              toggleUserDropdown(false);
              logout()
            }}>Sign out</p>
          </div>
        </div>
      </div>

    </div>
  );
}