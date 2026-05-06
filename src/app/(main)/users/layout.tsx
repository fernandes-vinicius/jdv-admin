import type { Metadata } from "next";
import { adminGuard } from "@/features/auth/actions/admin-guard";
import type { LayoutProps } from "@/types";

export const metadata: Metadata = {
  title: "Time",
};

export default async function UsersLayout({ children }: LayoutProps) {
  await adminGuard();

  return children;
}
