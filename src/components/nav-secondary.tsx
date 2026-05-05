"use client";

import Link from "next/link";
import { useState } from "react";
import { MailPlusIcon, ShieldUserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Nav } from "@/config/nav";
import { AdminGuard } from "@/features/auth/components/admin-guard";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";

export function NavSecondary({ items }: { items: Nav["navSecondary"] }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <AdminGuard>
        <CreateUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />

        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton
                  asChild
                  tooltip="Usuários"
                  className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                >
                  <Link href="/">
                    <ShieldUserIcon />
                    <span>Time Administrativo</span>
                  </Link>
                </SidebarMenuButton>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon-sm"
                        className="group-data-[collapsible=icon]:opacity-0"
                        variant="outline"
                        onClick={() => setDialogOpen(true)}
                      >
                        <MailPlusIcon />
                        <span className="sr-only">Adicionar</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Adicionar membro</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </AdminGuard>

      {items.map(({ title: group, items: menuItems }) => (
        <SidebarGroup key={group}>
          <SidebarGroupLabel>{group}</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
