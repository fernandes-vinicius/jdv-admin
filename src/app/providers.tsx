"use client";

import {
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider, signOut, useSession } from "@/lib/auth/client";

function is401(error: unknown) {
  console.log("\n\n__error:", error);

  return error instanceof Error && error.message.startsWith("[401]");
}

function handleAuthError(error: unknown) {
  if (is401(error) && typeof window !== "undefined") {
    // signOut({ callbackUrl: "/auth/sign-in" });
  }
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: handleAuthError }),
    mutationCache: new MutationCache({ onError: handleAuthError }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        // retry: 3,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

function SessionErrorHandler() {
  const { data: session } = useSession();

  // useEffect(() => {
  //   if (session?.error === "RefreshTokenError") {
  //     signOut({ callbackUrl: "/auth/sign-in" });
  //   }
  // }, [session?.error]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <SessionErrorHandler />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster richColors closeButton />
    </SessionProvider>
  );
}
