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
import { ChecklistItemDataTable } from "@/features/commercial/components/checklist-item-datatable";
import { ChecklistItemCreateForm } from "@/features/commercial/components/checklist-item-create-form";

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
      <PageContent>
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
      </PageContent>
    </Page>
  );
}
