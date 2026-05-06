import type { Metadata } from "next";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import type { PageProps } from "@/types";

export const metadata: Metadata = {
  title: "Esqueci minha senha",
};

export default async function ForgotPasswordPage({ searchParams }: PageProps) {
  const { email } = await searchParams;

  const defaultEmail =
    typeof email === "string" ? decodeURIComponent(email) : "";

  return (
    <Page>
      <PageHeader>
        <PageTagline>Recuperar acesso</PageTagline>
        <PageTitle className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Esqueceu a <span className="text-primary">senha</span>?
        </PageTitle>
        <PageDescription>
          Informe seu e-mail e enviaremos um link para você redefinir sua senha.
        </PageDescription>
      </PageHeader>
      <PageContent>
        <ForgotPasswordForm defaultEmail={defaultEmail} />
      </PageContent>
    </Page>
  );
}
