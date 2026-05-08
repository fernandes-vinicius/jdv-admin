import {
  Page,
  PageContent,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { SettingsTabs } from "@/features/settings/components/settings-tabs";

export default function SettingsPage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Sistema</PageTagline>
        <PageTitle>Configurações</PageTitle>
      </PageHeader>
      <PageContent>
        <SettingsTabs />
      </PageContent>
    </Page>
  );
}
