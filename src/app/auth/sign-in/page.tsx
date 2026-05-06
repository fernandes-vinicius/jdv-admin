import type { Metadata } from "next";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Entrar</PageTagline>
        <PageTitle className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Faça seu <span className="text-primary">login</span>.
        </PageTitle>
        <PageDescription>
          Acesse o painel administrativo com suas credenciais e tenha controle
          total dos dashboards.
        </PageDescription>
      </PageHeader>
      <PageContent>
        <SignInForm />
      </PageContent>
    </Page>
  );
}
