import { Page } from "@/components/page";
import { SiteHeader } from "@/components/site-header";
import { ChecklistItemDataTable } from "@/features/commercial/components/checklist-item-datatable";
import { ChecklistItemForm } from "@/features/commercial/components/checklist-item-form";

const breadcrumbs = [{ label: "Comercial" }];

export default function ChecklistPage() {
  return (
    <main>
      <SiteHeader title={"Comercial"} />

      <Page>
        <Page.Header>
          <Page.Tagline>Comercial</Page.Tagline>
          <Page.Title>Checklist</Page.Title>
        </Page.Header>
        <Page.Content>
          <div className="flex scroll-mt-24 flex-col items-stretch gap-8 xl:w-full xl:flex-row">
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
            {/* DataTable */}
            <div className="flex min-w-0 flex-1 flex-col">
              <ChecklistItemDataTable />
            </div>
          </div>
        </Page.Content>
      </Page>
    </main>
  );
}
