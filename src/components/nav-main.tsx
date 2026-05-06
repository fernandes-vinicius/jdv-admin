"use client";

import Link from "next/link";
import { useState } from "react";
import { MailPlusIcon, ShieldUserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
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

export function NavMain({ items = [] }: { items: Nav["navMain"] }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <AdminGuard>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2">
                <SidebarMenuButton asChild tooltip="Time">
                  <Link href="/users">
                    <ShieldUserIcon />
                    <span>Time</span>
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
          </AdminGuard>

          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <CreateUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
