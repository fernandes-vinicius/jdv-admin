import type { LayoutProps } from "@/types";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full sm:max-w-md">{children}</div>
    </main>
  );
}
