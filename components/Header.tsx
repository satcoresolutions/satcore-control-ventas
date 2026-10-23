
import Image from "next/image";

import InstallPWAButton from "./InstallPWAButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-[1100] w-full border-b border-border bg-background/90 backdrop-blur print:hidden">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Identidad de SatCore Solutions */}
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo de SatCore Solutions"
            width={200}
            height={65}
            priority
            className="h-auto w-32 shrink-0 object-contain sm:w-40"
          />

          <div className="hidden min-w-0 leading-tight sm:block">
            <p className="truncate text-base font-bold text-text-primary">
              Control de ventas
            </p>
            <p className="text-xs text-text-muted">
              SatCore Solutions
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex shrink-0 items-center gap-2">
          <InstallPWAButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}