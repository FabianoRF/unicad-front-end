import { PropsWithChildren } from "react";

export default function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex justify-center w-full bg-sky-900 h-20">
      {children}
    </header>
  );
}
