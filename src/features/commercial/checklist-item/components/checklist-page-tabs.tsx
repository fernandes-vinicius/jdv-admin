"use client";

import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChecklistPageTab } from "@/features/commercial/checklist-item/hooks/use-checklist-page-tab";

interface ChecklistPageTabsProps {
  itemsContent: ReactNode;
  reorderContent: ReactNode;
}

export function ChecklistPageTabs({
  itemsContent,
  reorderContent,
}: ChecklistPageTabsProps) {
  const [tab, setTab] = useChecklistPageTab();

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as typeof tab)}
      className="flex-1"
    >
      <TabsList>
        <TabsTrigger value="itens">Itens</TabsTrigger>
        <TabsTrigger value="reordenar">Reordenar rotina diária</TabsTrigger>
      </TabsList>
      <TabsContent value="itens" className="h-full flex-1">
        {itemsContent}
      </TabsContent>
      <TabsContent value="reordenar" className="flex flex-1 flex-col">
        {reorderContent}
      </TabsContent>
    </Tabs>
  );
}
