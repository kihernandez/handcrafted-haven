import type { ReactNode } from "react";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f4f2] flex items-center justify-center px-4 py-8">
      {children}
    </main>
  );
}