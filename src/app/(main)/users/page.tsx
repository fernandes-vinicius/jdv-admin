import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page";
import { CreateUserButton } from "@/features/users/components/create-user-button";
import { UsersDataTable } from "@/features/users/components/users-data-table";

export default function UsersPage() {
  return (
    <Page>
      <PageHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <PageTitle>Time</PageTitle>
          <PageDescription>
            Gerencie os usuários com acesso à plataforma. Consulte nomes e
            e-mails cadastrados e utilize a busca para localizar membros
            rapidamente.
          </PageDescription>
        </div>
        <CreateUserButton />
      </PageHeader>
      <PageContent>
        <UsersDataTable />
      </PageContent>
    </Page>
  );
}
