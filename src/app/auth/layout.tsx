import { JDVLogo } from "@/components/jdv-logo";
import type { LayoutProps } from "@/types";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background md:p-10">
      <div className="w-full md:max-w-md">
        <div className="px-8">
          <JDVLogo />
        </div>
        {children}
      </div>
    </main>
  );
}
