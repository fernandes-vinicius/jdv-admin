"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { AppearanceTab } from "@/features/settings/components/appearance-tab";
import { useIsMobile } from "@/hooks/use-mobile";

const DESKTOP_BREAKPOINT = 1440;

export function SettingsTabs() {
  const idMobile = useIsMobile(DESKTOP_BREAKPOINT);

  return (
    <Tabs
      orientation={idMobile ? "horizontal" : "vertical"}
      defaultValue="appearance"
      className="gap-8"
    >
      <TabsList variant="line" className="shrink-0 lg:w-52 lg:self-start">
        <TabsTrigger value="appearance">Aparência</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
      </TabsList>
      <TabsContent value="appearance">
        <AppearanceTab />
      </TabsContent>
      <TabsContent value="security">
        <section className="flex flex-col gap-6 xl:gap-8">
          <div className="flex flex-col gap-1.5">
            <h3 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
              Senha
            </h3>
            <p className="text-muted-foreground text-sm text-balance leading-relaxed">
              Altere sua senha para manter sua conta segura. <br />{" "}
              Certifique-se de escolher uma senha forte e única, combinando
              letras, números e caracteres especiais.
            </p>
          </div>
          <ChangePasswordForm />
        </section>
      </TabsContent>
    </Tabs>
  );
}
