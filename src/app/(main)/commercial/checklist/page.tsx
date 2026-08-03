import type { Metadata } from "next";
import {
  Page,
  PageContent,
  PageHeader,
  PageSection,
  PageSectionContent,
  PageSectionSidebar,
  PageSectionSidebarTitle,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { ChecklistItemCreateForm } from "@/features/commercial/checklist-item/components/checklist-item-create-form";
import { ChecklistItemDataTable } from "@/features/commercial/checklist-item/components/checklist-item-datatable";
import { ChecklistItemPeriodReorderList } from "@/features/commercial/checklist-item/components/checklist-item-period-reorder-list";
import { ChecklistPageTabs } from "@/features/commercial/checklist-item/components/checklist-page-tabs";

export const metadata: Metadata = {
  title: "Checklist",
  description: "Gerencie os itens do checklist comercial.",
};

export default function ChecklistPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Comercial</PageTagline>
        <PageTitle>Checklist</PageTitle>
      </PageHeader>
      <PageContent className="flex-1">
        <ChecklistPageTabs
          itemsContent={
            <PageSection>
              <PageSectionSidebar>
                <PageSectionSidebarTitle>
                  Adicionar novo item ao checklist
                </PageSectionSidebarTitle>
                <ChecklistItemCreateForm />
              </PageSectionSidebar>
              <PageSectionContent>
                <ChecklistItemDataTable />
              </PageSectionContent>
            </PageSection>
          }
          reorderContent={<ChecklistItemPeriodReorderList />}
        />
      </PageContent>
    </Page>
  );
}
