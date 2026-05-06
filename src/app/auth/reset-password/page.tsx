import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import type { PageProps } from "@/types";

export const metadata: Metadata = {
  title: "Recuperar senha",
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token || typeof token !== "string") {
    redirect("/auth/forgot-password");
  }

  return (
    <Page>
      <PageHeader>
        <PageTagline>Nova senha</PageTagline>
        <PageTitle className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Redefina sua <span className="text-primary">senha</span>.
        </PageTitle>
        <PageDescription>
          Escolha uma nova senha para acessar sua conta.
        </PageDescription>
      </PageHeader>
      <PageContent>
        <ResetPasswordForm token={token} />
      </PageContent>
    </Page>
  );
}
