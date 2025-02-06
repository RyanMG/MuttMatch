'use client';

import { ReactNode } from "react";
import { useAuthContext } from "@context/authProvider";

export default function Logout(): ReactNode {
  const {logout} = useAuthContext();
  setTimeout(() => {
    logout();
  }, 1000);

  return (
    <p>Logout</p>
  );
}
