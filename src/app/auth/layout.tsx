import type { LayoutProps } from "@/types";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background md:p-10">
      <div className="w-full md:max-w-md">{children}</div>
    </main>
  );
}
