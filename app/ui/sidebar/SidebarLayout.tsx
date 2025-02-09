'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "@context/authProvider";

function SidebarItem({
  text,
  link
}: {
  text: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <p className="text-white hover:text-gray-200 w-full my-2">{text}</p>
    </Link>
  )
}

const SidebarItems = () => {
  return (
    <nav className="flex flex-col">
      <SidebarItem text="Search Dogs" link="/dogs?page=1" />
      <SidebarItem text="View Saved Dogs" link="/dogs/saved" />
      <SidebarItem text="Get My Match!" link="/dog/match" />
    </nav>
  )
}

export default function SidebarLayout() {
  const [linksDropdownShown, showLinksDropdown] = useState<boolean>(false);
  const { hasSession } = useAuthContext();

  return (
    <aside className="flex flex-col w-full h-18 md:w-[200px] md:h-full">
      <div className="bg-indigo-900 rounded-lg m-2 p-3 md:flex-1">
        <div className="md:hidden">
          <div onClick={() => showLinksDropdown(!linksDropdownShown)}>
            <svg className="hover:fill-gray-300" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
          </div>

          <div className={`border-t border-indigo-600 pt-2 mt-1 ${linksDropdownShown ? 'flex' : 'hidden'}`}>
            {hasSession && (
              <SidebarItems />
            )}

          </div>
        </div>

        <div className="hidden md:block">
          {hasSession && (
            <SidebarItems />
          )}
        </div>
      </div>
    </aside>
  );
}