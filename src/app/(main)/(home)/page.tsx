import { getServerSession } from "next-auth";
import { Page } from "@/components/page";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent } from "@/components/ui/card";
import { getAwardChecklistItems } from "@/features/commercial/actions/get-award-checklist-items";
import { getDailyChecklistItems } from "@/features/commercial/actions/get-daily-checklist-items";
import { getStandChecklistItems } from "@/features/commercial/actions/get-stand-checklist-items";
import { getUsers } from "@/features/users/actions/get-users";
import { authOptions } from "@/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.is_admin ?? false;

  const [daily, awards, stand, users] = await Promise.allSettled([
    getDailyChecklistItems(),
    getAwardChecklistItems(),
    getStandChecklistItems(),
    isAdmin ? getUsers() : Promise.resolve([]),
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
    .slice(0, 5);

  return (
    <>
      <SiteHeader title="Dashboard" />
      <Page>
        <Page.Header>
          <Page.Tagline>Visão geral</Page.Tagline>
          <Page.Title>Dashboard</Page.Title>
          <Page.Description>Resumo geral do sistema.</Page.Description>
        </Page.Header>

        <Page.Content className="gap-6">
          {isAdmin && (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <StatCard label="Total de usuários" value={totalUsers} />
              <StatCard label="Administradores" value={adminCount} />
              <StatCard label="Usuários ativos" value={activeCount} />
            </section>
          )}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Base do estande" value={standCount} />
            <StatCard label="Rotina diária" value={dailyCount} />
            <StatCard label="Premiação semanal" value={awardsCount} />
          </section>

          {isAdmin && recentLogins.length > 0 && (
            <section>
              <h2 className="mb-3 font-semibold text-muted-foreground text-sm">
                Últimos acessos
              </h2>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="px-4 py-2 text-left font-medium">
                          Nome
                        </th>
                        <th className="px-4 py-2 text-left font-medium">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left font-medium">
                          Último acesso
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLogins.map((u) => (
                        <tr key={u.id} className="border-b last:border-0">
                          <td className="px-4 py-2">{u.name}</td>
                          <td className="px-4 py-2 text-muted-foreground">
                            {u.email}
                          </td>
                          <td className="px-4 py-2 text-muted-foreground">
                            {new Date(u.last_login_at).toLocaleString("pt-BR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </section>
          )}
        </Page.Content>
      </Page>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1 pt-6">
        <span className="font-bold text-3xl">{value}</span>
        <span className="text-muted-foreground text-sm">{label}</span>
      </CardContent>
    </Card>
  );
}
