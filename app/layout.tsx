import '@/app/globals.css'; // Assume basic tailwind directives inside here
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adaptive Socratic Platform',
  description: 'AI Driven cognitive pedagogical evolution platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}