import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PageLogo(): ReactNode {
  return (
    <Link href="/">
      <div className="flex flex-row items-center gap-2">
        <Image
          src="/doggo.png"
          width={25}
          height={25}
          alt="MuttMatch Logo"
        />
        <h1 className="text-xl font-extrabold text-white">MuttMatch</h1>
      </div>
    </Link>
  );
}
