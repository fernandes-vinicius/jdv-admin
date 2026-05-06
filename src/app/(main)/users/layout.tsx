import type { Metadata } from "next";
import { adminGuard } from "@/features/auth/actions/admin-guard";
import type { LayoutProps } from "@/types";

export const metadata: Metadata = {
  title: "Time",
  description:
    "Gerencie os usuários com acesso à plataforma. Consulte nomes e e-mails cadastrados e utilize a busca para localizar membros rapidamente.",
};

export default async function UsersLayout({ children }: LayoutProps) {
  await adminGuard();

  return children;
}
