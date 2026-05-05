import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "@/app/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { fontMono, fontSans } from "@/config/fonts";
import { baseMetadata } from "@/config/seo";
import { cn } from "@/lib/utils";
import type { LayoutProps } from "@/types";

export const metadata = baseMetadata;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable,
      )}
    >
      <body>
        <NuqsAdapter>
          <ThemeProvider>
            <Providers>{children}</Providers>
            <Toaster richColors closeButton />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
