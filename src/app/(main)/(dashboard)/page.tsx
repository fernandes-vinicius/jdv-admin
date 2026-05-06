import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ShieldUserIcon, UserCheckIcon, UsersIcon } from "@/components/icons";
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { getAwardChecklistItems } from "@/features/commercial/actions/get-award-checklist-items";
import { getDailyChecklistItems } from "@/features/commercial/actions/get-daily-checklist-items";
import { getStandChecklistItems } from "@/features/commercial/actions/get-stand-checklist-items";
import { ChecklistBarChart } from "@/features/dashboard/components/checklist-bar-chart";
import { RecentLoginsTable } from "@/features/dashboard/components/recent-logins-table";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { getUsers } from "@/features/users/actions/get-users";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Resumo geral do sistema",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const is_admin = session?.user?.is_admin ?? false;

  const [daily, awards, stand, users] = await Promise.allSettled([
    getDailyChecklistItems(),
    getAwardChecklistItems(),
    getStandChecklistItems(),
    is_admin ? getUsers() : Promise.resolve([]),
  ]);

  const dailyCount = daily.status === "fulfilled" ? daily.value.length : 0;
  const awardsCount = awards.status === "fulfilled" ? awards.value.length : 0;
  const standCount = stand.status === "fulfilled" ? stand.value.length : 0;
  const usersList = users.status === "fulfilled" ? users.value : [];

  const totalUsers = usersList.length;
  const adminCount = usersList.filter((u) => u.is_admin).length;
  const activeCount = usersList.filter((u) => u.is_active).length;

  const recentLogins = [...usersList]
    .sort(
      (a, b) =>
        new Date(b.last_login_at).getTime() -
        new Date(a.last_login_at).getTime(),
    )
    .slice(0, 50);

  const chartData = [
    { name: "Base", total: standCount },
    { name: "Diário", total: dailyCount },
    { name: "Premiação", total: awardsCount },
  ];

  return (
    <Page>
      <PageHeader>
        <PageTagline>Visão geral</PageTagline>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>Resumo geral do sistema</PageDescription>
      </PageHeader>

      <PageContent className="gap-6">
        {is_admin && (
          <section className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            <div className="flex flex-col items-stretch gap-4 lg:w-56 lg:shrink-0">
              <StatCard
                label="Total de usuários"
                value={totalUsers}
                icon={UsersIcon}
                iconClassName="bg-blue-500/10 text-blue-600"
              />
              <StatCard
                label="Administradores"
                value={adminCount}
                icon={ShieldUserIcon}
                iconClassName="bg-amber-500/10 text-amber-600"
              />
              <StatCard
                label="Usuários ativos"
                value={activeCount}
                icon={UserCheckIcon}
                iconClassName="bg-green-500/10 text-green-600"
              />
            </div>
            <div className="min-w-0 flex-1">
              <RecentLoginsTable users={recentLogins} />
            </div>
          </section>
        )}

        <ChecklistBarChart data={chartData} />
      </PageContent>
    </Page>
  );
}
