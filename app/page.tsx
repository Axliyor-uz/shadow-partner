import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-24 px-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm my-12 sm:items-start">
        
        {/* Top Logo */}
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert opacity-80"
            src="/next.svg"
            alt="Next.js logo"
            width={90}
            height={18}
            priority
          />
          <span className="text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded">
            Socratic Engine
          </span>
        </div>

        {/* Core Value Proposition */}
        <div className="flex flex-col items-center gap-6 text-center my-12 sm:items-start sm:text-left">
          <h1 className="max-w-md text-4xl font-extrabold leading-10 tracking-tight text-zinc-900 dark:text-zinc-50">
            Cognitive Pedagogical Evolution Platform
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            An adaptive learning dialogue architecture built to guide active self-discovery. Dive deep into complex problem spaces without receiving simple direct answers.
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col gap-4 text-base font-medium w-full sm:flex-row">
          <Link
            href="/dashboard"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm sm:w-48"
          >
            Enter Dashboard &rarr;
          </Link>
          
          <a
            className="flex h-12 w-full items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 transition-colors text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 sm:w-36"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            System Docs
          </a>
        </div>

      </main>
    </div>
  );
}