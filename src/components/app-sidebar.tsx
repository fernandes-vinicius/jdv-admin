"use client";

import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavTertiary } from "@/components/nav-tertiary";
import { NavUser } from "@/components/nav-user";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { nav } from "@/config/nav";

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <Link
              href="/"
              aria-label="Ir para a página inicial"
              className="mx-auto inline-flex flex-col items-center justify-center gap-3 text-center"
            >
              <span className="font-heading font-semibold text-[clamp(1.125rem,2.5vw,2rem)] leading-none tracking-tighter">
                jdv
                <span className="inline-block size-1.5 shrink-0 bg-primary" />
              </span>
              <Badge variant="secondary">Administração</Badge>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav.navMain} />
        <NavSecondary items={nav.navSecondary} />
        <NavTertiary items={nav.navTertiary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
