import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Visão geral</PageTagline>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Resumo geral do sistema</PageDescription>
      </PageHeader>

      <PageContent className="gap-4!">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="flex flex-col items-stretch gap-4 lg:w-56 lg:shrink-0">
            <Skeleton className="min-h-36 w-full" />
            <Skeleton className="min-h-36 w-full" />
            <Skeleton className="min-h-36 w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <Skeleton className="min-h-full w-full" />
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="min-h-80 w-full" />
          <Skeleton className="min-h-80 w-full" />
        </div>

        <Skeleton className="min-h-80 w-full" />
      </PageContent>
    </Page>
  );
}
