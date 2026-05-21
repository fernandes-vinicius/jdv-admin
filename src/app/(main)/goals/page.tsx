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
import { SalesPlanCreateForm } from "@/features/commercial/goals/components/sales-plan-create-form";
import { SalesPlanDataTable } from "@/features/commercial/goals/components/sales-plan-datatable";

export const metadata: Metadata = {
  title: "Metas",
  description: "Gerencie os planos anuais de vendas por empreendimento.",
};

export default function GoalsPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Comercial</PageTagline>
        <PageTitle>Metas</PageTitle>
      </PageHeader>
      <PageContent>
        <PageSection>
          <PageSectionSidebar>
            <PageSectionSidebarTitle>
              Adicionar novo plano de metas
            </PageSectionSidebarTitle>
            <SalesPlanCreateForm />
          </PageSectionSidebar>
          <PageSectionContent>
            <SalesPlanDataTable />
          </PageSectionContent>
        </PageSection>
      </PageContent>
    </Page>
  );
}
