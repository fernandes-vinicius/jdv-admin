import {
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/icons";

export const nav = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      url: "/",
    },
  ],
  navSecondary: [
    {
      title: "Comercial",
      items: [
        {
          name: "Checklist — A fazer",
          url: "/commercial/checklist",
          icon: ListTodoIcon,
        },
      ],
    },
    // {
    //   title: "Vendas",
    //   items: [],
    // },
  ],
  navTertiary: [
    {
      title: "Configurações",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};

export type Nav = typeof nav;

// Páginas que existem mas não aparecem na nav (ex: rotas hardcoded nos componentes)
const extraPageTitles: Record<string, string> = {
  "/users": "Time",
};

export function getRouteTitle(pathname: string): string {
  if (extraPageTitles[pathname]) return extraPageTitles[pathname];

  const mainItem = nav.navMain.find((item) => item.url === pathname);
  if (mainItem) return mainItem.title;

  for (const group of nav.navSecondary) {
    if (group.items.some((item) => item.url === pathname)) return group.title;
  }

  const tertiaryItem = nav.navTertiary.find(
    (item) => item.url === pathname && item.url !== "#",
  );
  if (tertiaryItem) return tertiaryItem.title;

  return "";
}
