"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      </TabsList>
      <TabsContent value="appearance">
        <AppearanceTab />
      </TabsContent>
    </Tabs>
  );
}
