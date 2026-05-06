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
import { FieldActionDataTable } from "@/features/commercial/components/field-action-datatable";
import { FieldActionForm } from "@/features/commercial/components/field-action-form";

export const metadata: Metadata = {
  title: "Armas",
  description: "Gerencie as armas do setor comercial.",
};

export default function FieldActionsPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Comercial</PageTagline>
        <PageTitle>Armas</PageTitle>
      </PageHeader>
      <PageContent>
        <PageSection>
          <PageSectionSidebar>
            <PageSectionSidebarTitle>
              Adicionar nova arma
            </PageSectionSidebarTitle>
            <FieldActionForm />
          </PageSectionSidebar>
          <PageSectionContent>
            <FieldActionDataTable />
          </PageSectionContent>
        </PageSection>
      </PageContent>
    </Page>
  );
}
