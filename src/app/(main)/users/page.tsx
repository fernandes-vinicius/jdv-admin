import { Page } from "@/components/page";
import { SiteHeader } from "@/components/site-header";
import { UsersDataTable } from "@/features/users/components/users-datatable";

export default function UsersPage() {
  return (
    <main>
      <SiteHeader title="Time administrativo" />

      <Page>
        <Page.Header>
          <Page.Title>Time</Page.Title>
          <Page.Description>
            Gerencie os usuários com acesso à plataforma. Consulte nomes e
            e-mails cadastrados e utilize a busca para localizar membros
            rapidamente.
          </Page.Description>
        </Page.Header>
        <Page.Content>
          <UsersDataTable />
        </Page.Content>
      </Page>
    </main>
  );
}
