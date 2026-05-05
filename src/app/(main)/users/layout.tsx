import { adminGuard } from "@/features/auth/actions/admin-guard";
import type { LayoutProps } from "@/types";

export default async function UsersLayout({ children }: LayoutProps) {
  await adminGuard();

  return children;
}
