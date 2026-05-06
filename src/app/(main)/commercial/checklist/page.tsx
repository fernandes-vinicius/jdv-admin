import {
  Page,
  PageContent,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { ChecklistItemDataTable } from "@/features/commercial/components/checklist-item-datatable";
import { ChecklistItemForm } from "@/features/commercial/components/checklist-item-form";

export default function ChecklistPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Comercial</PageTagline>
        <PageTitle>Checklist</PageTitle>
      </PageHeader>
      <PageContent>
        <section className="flex scroll-mt-24 flex-col items-stretch gap-8 xl:w-full xl:flex-row xl:gap-16">
          {/* Form */}
          <div className="z-30 flex w-full flex-col gap-4 overflow-hidden overscroll-none xl:sticky xl:top-[calc(var(--header-height)+1px)] xl:ml-auto xl:h-[90svh] xl:w-(--sidebar-width)">
            <div className="h-(--top-spacing) shrink-0" />
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
                Adicionar novo item ao checklist
              </h2>
              <ChecklistItemForm />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <ChecklistItemDataTable />
          </div>
        </section>
      </PageContent>
    </Page>
  );
}
