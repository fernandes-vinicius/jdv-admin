"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";
import { LoginHistoryTable } from "@/features/auth/components/login-history-table";
import { FunnelConfigSection } from "@/features/funnel-config/components/funnel-config-section";
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
      <div className="shrink-0 overflow-x-auto">
        <TabsList variant="line">
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="funnel-config">Conversão histórica</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="appearance">
        <AppearanceTab />
      </TabsContent>
      <TabsContent value="funnel-config">
        <FunnelConfigSection />
      </TabsContent>
      <TabsContent value="security">
        <section className="flex flex-col gap-6 xl:gap-8">
          <div className="flex flex-col gap-1.5">
            <h3 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
              Senha
            </h3>
            <p className="text-balance text-muted-foreground text-sm leading-relaxed">
              Altere sua senha para manter sua conta segura. <br />{" "}
              Certifique-se de escolher uma senha forte e única, combinando
              letras, números e caracteres especiais.
            </p>
          </div>

          <ChangePasswordForm />

          <Separator />

          <div className="flex flex-col gap-1.5">
            <h3 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
              Histórico de acesso
            </h3>
            <p className="text-balance text-muted-foreground text-sm leading-relaxed">
              Últimos acessos à sua conta. Se identificar alguma atividade
              suspeita, altere sua senha imediatamente.
            </p>
          </div>
          <LoginHistoryTable />
        </section>
      </TabsContent>
    </Tabs>
  );
}
