import Link from "next/link";

interface PageShellProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export function PageShell({ children, showNav = true }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07020f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,70,239,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(34,211,238,0.12),_transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-8 sm:py-10">
        {showNav && (
          <nav className="mb-8 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="font-arcade text-xs uppercase tracking-[0.25em] text-fuchsia-300 transition-colors hover:text-fuchsia-200 sm:text-sm"
            >
              The Indy 500
            </Link>
            <div className="flex gap-3">
              <Link
                href="/"
                className="rounded-full border border-fuchsia-500/40 px-4 py-2 font-arcade text-[10px] uppercase tracking-wider text-fuchsia-200 transition-all hover:border-fuchsia-300 hover:bg-fuchsia-500/10 hover:shadow-[0_0_16px_rgba(217,70,239,0.4)] sm:text-xs"
              >
                Scoreboard
              </Link>
              <Link
                href="/admin"
                className="rounded-full border border-cyan-500/40 px-4 py-2 font-arcade text-[10px] uppercase tracking-wider text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.4)] sm:text-xs"
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
        {children}
      </div>
    </div>
  );
}
