"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminGuard } from "@/features/auth/components/admin-guard";
import { FunnelConfigEditForm } from "@/features/funnel-config/components/funnel-config-edit-form";
import { useFunnelConfig } from "@/features/funnel-config/hooks/use-funnel-config";

export function FunnelConfigSection() {
  const { data: config, isPending } = useFunnelConfig();

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6 xl:gap-8">
      <div className="flex flex-col gap-1.5">
        <h3 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
          Período de conversão histórica
        </h3>
        <p className="text-balance text-muted-foreground text-sm leading-relaxed">
          Este período afeta apenas o gráfico de conversão histórica dos
          dashboards — os demais indicadores do funil (leads, visitas, vendas)
          não são afetados. Ao definir uma data inicial, os acumulados do
          gráfico recomeçam do zero nela; sem período definido, ele mostra todo
          o histórico. A configuração é única e vale para todos os
          empreendimentos.
        </p>
        <p className="text-balance text-muted-foreground text-sm leading-relaxed">
          {config
            ? `Período atual: de ${config.start_date} até ${config.end_date}.`
            : "Nenhum período definido no momento — o gráfico está mostrando todo o histórico."}
        </p>
      </div>

      <AdminGuard>
        <Separator />
        <FunnelConfigEditForm config={config ?? null} />
      </AdminGuard>
    </section>
  );
}
