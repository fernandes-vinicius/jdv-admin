import { Page } from "@/components/page";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <Page>
      <Page.Header>
        <span className="mb-8 font-heading font-semibold text-[clamp(1.125rem,2.5vw,2rem)] leading-none tracking-tighter">
          jdv
        </span>
        <Page.Tagline>Entrar</Page.Tagline>
        <Page.Title className="font-heading font-semibold text-[56px] text-foreground leading-none tracking-tight sm:text-[64px]">
          Faça seu <span className="text-primary">login</span>.
        </Page.Title>
        <Page.Description>
          Acesse o painel administrativo com suas credenciais e tenha
          controle total dos dashboards.
        </Page.Description>
      </Page.Header>
      <Page.Content>
        <SignInForm />
      </Page.Content>
    </Page>
  );
}
