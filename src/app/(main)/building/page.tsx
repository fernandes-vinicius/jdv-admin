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
import { BuildingDataTable } from "@/features/building/components/building-datatable";
import { BuildingCreateForm } from "@/features/building/components/building-create-form";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description: "Gerencie os empreendimentos.",
};

export default function BuildingPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Gestão</PageTagline>
        <PageTitle>Empreendimentos</PageTitle>
      </PageHeader>
      <PageContent>
        <PageSection>
          <PageSectionSidebar>
            <PageSectionSidebarTitle>
              Adicionar novo empreendimento
            </PageSectionSidebarTitle>
            <BuildingCreateForm />
          </PageSectionSidebar>
          <PageSectionContent>
            <BuildingDataTable />
          </PageSectionContent>
        </PageSection>
      </PageContent>
    </Page>
  );
}
