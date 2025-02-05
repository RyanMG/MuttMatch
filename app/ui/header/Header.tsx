import {ReactNode} from 'React';
import UserOptions from "./UserOptions";

export default function Header(): ReactNode {
  return (
    <header className="w-full h-10 bg-orange-400 flex flex-row justify-end items-center">
      <section className="pr-6">
        <UserOptions />
      </section>
    </header>
  );
}
