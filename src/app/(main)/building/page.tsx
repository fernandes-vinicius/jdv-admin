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
import { BuildingForm } from "@/features/building/components/building-form";

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
            <BuildingForm />
          </PageSectionSidebar>
          <PageSectionContent>
            <BuildingDataTable />
          </PageSectionContent>
        </PageSection>
      </PageContent>
    </Page>
  );
}
