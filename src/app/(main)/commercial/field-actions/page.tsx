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
import { FieldActionDataTable } from "@/features/commercial/field-action/components/field-action-datatable";
import { FieldActionCreateForm } from "@/features/commercial/field-action/components/field-action-create-form";

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
              Adicionar nova arma ao arsenal
            </PageSectionSidebarTitle>
            <FieldActionCreateForm />
          </PageSectionSidebar>
          <PageSectionContent>
            <FieldActionDataTable />
          </PageSectionContent>
        </PageSection>
      </PageContent>
    </Page>
  );
}
