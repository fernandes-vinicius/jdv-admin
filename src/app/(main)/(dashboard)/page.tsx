import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Building2Icon, GoalIcon, UsersIcon } from "@/components/icons";
import {
  Page,
  PageContent,
  PageHeader,
  PageTagline,
  PageTitle,
} from "@/components/page";
import { getBuildings } from "@/features/building/actions/get-buildings";
import { getAwardChecklistItems } from "@/features/commercial/checklist-item/actions/get-award-checklist-items";
import { getDailyChecklistItems } from "@/features/commercial/checklist-item/actions/get-daily-checklist-items";
import { getFieldActions } from "@/features/commercial/field-action/actions/get-field-actions";
import { getStandChecklistItems } from "@/features/commercial/checklist-item/actions/get-stand-checklist-items";
import { BuildingsTable } from "@/features/dashboard/components/buildings-table";
import { ChecklistBarChart } from "@/features/dashboard/components/checklist-bar-chart";
import { FieldActionsTable } from "@/features/dashboard/components/field-actions-table";
import { RecentLoginsTable } from "@/features/dashboard/components/recent-logins-table";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { getSalesPlans } from "@/features/commercial/goals/actions/get-sales-plans";
import { getUsers } from "@/features/users/actions/get-users";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Resumo geral do sistema",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const is_admin = session?.user?.is_admin ?? false;

  const [
    daily,
    awards,
    stand,
    users,
    buildingsResult,
    salesPlansResult,
    fieldActionsResult,
  ] = await Promise.allSettled([
    getDailyChecklistItems(),
    getAwardChecklistItems(),
    getStandChecklistItems(),
    is_admin ? getUsers() : Promise.resolve([]),
    getBuildings(),
    is_admin ? getSalesPlans() : Promise.resolve([]),
    getFieldActions(),
  ]);

  const dailyCount = daily.status === "fulfilled" ? daily.value.length : 0;
  const awardsCount = awards.status === "fulfilled" ? awards.value.length : 0;
  const standCount = stand.status === "fulfilled" ? stand.value.length : 0;
  const usersList = users.status === "fulfilled" ? users.value : [];
  const allBuildings =
    buildingsResult.status === "fulfilled" ? buildingsResult.value : [];
  const buildingsList = allBuildings.slice(0, 10);
  const salesPlansList =
    salesPlansResult.status === "fulfilled" ? salesPlansResult.value : [];
  const allFieldActions =
    fieldActionsResult.status === "fulfilled" ? fieldActionsResult.value : [];
  const recentFieldActions = [...allFieldActions]
    .sort((a, b) => b.display_order - a.display_order)
    .slice(0, 5);

  const totalUsers = usersList.length;
  const totalBuildings = allBuildings.length;
  const totalSalesPlans = salesPlansList.length;

  const recentLogins = [...usersList]
    .sort(
      (a, b) =>
        new Date(b.last_login_at).getTime() -
        new Date(a.last_login_at).getTime(),
    )
    .slice(0, 10);

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
      </PageHeader>

      <PageContent className="gap-4!">
        {is_admin && (
          <section className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
            <div className="flex flex-col items-stretch gap-4 lg:w-56 lg:shrink-0">
              <StatCard
                label="Empreendimentos"
                value={totalBuildings}
                icon={Building2Icon}
                iconClassName="bg-blue-500/10 text-blue-600"
              />
              <StatCard
                label="Metas"
                value={totalSalesPlans}
                icon={GoalIcon}
                iconClassName="bg-amber-500/10 text-amber-600"
              />
              <StatCard
                label="Time (membros)"
                value={totalUsers}
                icon={UsersIcon}
                iconClassName="bg-green-500/10 text-green-600"
              />
            </div>
            <div className="min-w-0 flex-1">
              <BuildingsTable buildings={buildingsList} />
            </div>
          </section>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <ChecklistBarChart data={chartData} />
          <FieldActionsTable fieldActions={recentFieldActions} />
        </div>

        {is_admin && <RecentLoginsTable users={recentLogins} />}
      </PageContent>
    </Page>
  );
}
