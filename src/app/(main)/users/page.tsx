import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/page";
import { UsersDataTable } from "@/features/users/components/users-data-table";

export default function UsersPage() {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Time</PageTitle>
        <PageDescription>
          Gerencie os usuários com acesso à plataforma. Consulte nomes e e-mails
          cadastrados e utilize a busca para localizar membros rapidamente.
        </PageDescription>
      </PageHeader>
      <PageContent>
        <UsersDataTable />
      </PageContent>
    </Page>
  );
}
