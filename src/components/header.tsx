import Link from "next/link";
import { LogoIcon } from "./icons";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <LogoIcon className="h-6 w-6" />
            <span>ResumeCraft AI</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
