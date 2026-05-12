import type { Metadata } from "next";
import { JDVLogo } from "@/components/jdv-logo";
import { UnauthorizedActions } from "./actions";

export const metadata: Metadata = {
  title: "Sessão expirada",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background md:p-10">
      <div className="flex w-full flex-col gap-6 px-8 md:max-w-md">
        <JDVLogo />
        <div className="flex flex-col gap-2">
          <h1 className="font-heading font-semibold text-2xl text-foreground">
            Sessão expirada
          </h1>
          <p className="text-muted-foreground text-sm">
            Sua sessão expirou ou você não tem autorização para acessar este
            recurso. Tente novamente ou saia e faça login com outra conta.
          </p>
        </div>
        <UnauthorizedActions />
      </div>
    </main>
  );
}
