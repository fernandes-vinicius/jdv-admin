import type { Metadata } from "next";
import {
  Page,
  PageContent,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { Profile } from "@/features/profile/components/profile";

export const metadata: Metadata = {
  title: "Meu perfil",
};

export default function ProfilePage() {
  return (
    <Page>
      <PageHeader>
        <PageTagline>Conta</PageTagline>
        <PageTitle>Meu perfil</PageTitle>
      </PageHeader>
      <PageContent className="flex  flex-1 items-center justify-start">
        <div className="mx-auto max-w-md w-full">
          <Profile />
        </div>
      </PageContent>
    </Page>
  );
}
