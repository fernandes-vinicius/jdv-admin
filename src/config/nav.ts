import {
  Building2Icon,
  GoalIcon,
  // HelpCircleIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  SettingsIcon,
  SwordsIcon,
} from "@/components/icons";

export const nav = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      url: "/",
    },
    {
      title: "Empreendimentos",
      icon: Building2Icon,
      url: "/building",
    },
    {
      title: "Metas",
      icon: GoalIcon,
      url: "/goals",
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
        {
          name: "Armas",
          url: "/commercial/field-actions",
          icon: SwordsIcon,
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
      url: "/settings",
      icon: SettingsIcon,
    },
    // {
    //   title: "Ajuda",
    //   url: "#",
    //   icon: HelpCircleIcon,
    // },
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
