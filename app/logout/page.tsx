'use client';

import { ReactNode } from "react";
import { useAuthContext } from "@context/authProvider";

export default function Logout(): ReactNode {
  const {logout} = useAuthContext();
  setTimeout(() => {
    logout();
  }, 2000);

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="w-60 border border-orange-400 rounded-lg p-4">
        <h1 className="font-bold text-center text-xl text-indigo-950 pb-2">Session Expired</h1>
        <p className="text-indigo-950">Your session  has expired. You will be routed to the login page to re-authenticate</p>
      </div>
    </div>

  );
}
