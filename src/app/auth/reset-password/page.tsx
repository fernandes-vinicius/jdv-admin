import { redirect } from "next/navigation";
import { Page } from "@/components/page";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import type { PageProps } from "@/types";

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token || typeof token !== "string") {
    redirect("/auth/forgot-password");
  }

  return (
    <Page>
      <Page.Header>
        <span className="mb-8 font-heading font-semibold text-[clamp(1.125rem,2.5vw,2rem)] leading-none tracking-tighter">
          jdv
        </span>
        <Page.Tagline>Nova senha</Page.Tagline>
        <Page.Title className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Redefina sua <span className="text-primary">senha</span>.
        </Page.Title>
        <Page.Description>
          Escolha uma nova senha para acessar sua conta.
        </Page.Description>
      </Page.Header>
      <Page.Content>
        <ResetPasswordForm token={token} />
      </Page.Content>
    </Page>
  );
}
