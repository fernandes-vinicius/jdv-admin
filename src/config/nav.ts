import {
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  ShieldUserIcon,
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
    {
      title: "Vendas",
      items: [],
    },
  ],
  navTertiary: [
    {
      title: "Configurações",
      url: "#",
      icon: ShieldUserIcon,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};

export type Nav = typeof nav;
