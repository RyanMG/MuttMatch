import {ReactNode} from 'react';
import UserOptions from "./UserOptions";
import PageLogo from "./PageLogo";

export default function Header(): ReactNode {
  return (
    <header className="w-full h-10 bg-orange-400 flex flex-row justify-between items-center">
      <section className="pl-6">
        <PageLogo />
      </section>
      <section className="pr-6">
        <UserOptions />
      </section>
    </header>
  );
}
