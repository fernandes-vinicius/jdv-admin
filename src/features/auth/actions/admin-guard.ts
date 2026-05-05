"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function adminGuard() {
  const session = await getServerSession(authOptions);

  if (!session?.user.is_admin) {
    redirect("/");
  }

  return session;
}
