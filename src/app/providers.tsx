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
import {
  SessionProvider,
  getSession,
  signOut,
  useSession,
} from "@/lib/auth/client";
import { ApiError } from "@/types/api";

function is401(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

let isHandlingUnauth = false;

async function handleAuthError(error: unknown) {
  if (!is401(error) || typeof window === "undefined" || isHandlingUnauth)
    return;

  isHandlingUnauth = true;
  try {
    const session = await getSession();
    if (!session || session.error === "RefreshTokenError") {
      await signOut({ callbackUrl: "/auth/sign-in" });
    }
  } finally {
    isHandlingUnauth = false;
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
      <Toaster richColors closeButton />
    </SessionProvider>
  );
}
