"use client";

import {
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSession, SessionProvider, signOut } from "next-auth/react";
import { useEffect } from "react";

function is401(error: unknown) {
  return error instanceof Error && error.message.startsWith("[401]");
}

function handleAuthError(error: unknown) {
  if (is401(error) && typeof window !== "undefined") {
    signOut({ callbackUrl: "/auth/sign-in" });
  }
}

function makeQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({ onError: handleAuthError }),
    mutationCache: new MutationCache({ onError: handleAuthError }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
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

  useEffect(() => {
    if (session?.error === "RefreshTokenError") {
      signOut({ callbackUrl: "/auth/sign-in" });
    }
  }, [session?.error]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <SessionErrorHandler />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
