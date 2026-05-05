import { Page } from "@/components/page";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import type { PageProps } from "@/types";

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const { email } = await searchParams;

  return (
    <Page>
      <Page.Header>
        <span className="mb-8 font-heading font-semibold text-[clamp(1.125rem,2.5vw,2rem)] leading-none tracking-tighter">
          jdv
        </span>
        <Page.Tagline>Recuperar acesso</Page.Tagline>
        <Page.Title className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Esqueceu a <span className="text-primary">senha</span>?
        </Page.Title>
        <Page.Description>
          Informe seu e-mail e enviaremos um link para você redefinir sua senha.
        </Page.Description>
      </Page.Header>
      <Page.Content>
        <ForgotPasswordForm defaultEmail={email?.toString() || ""} />
      </Page.Content>
    </Page>
  );
}
