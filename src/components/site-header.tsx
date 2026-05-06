"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getRouteTitle } from "@/config/nav";
import { cn } from "@/lib/utils";

export function SiteHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const title = getRouteTitle(pathname);

  return (
    <header
      className={cn(
        "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 my-auto data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium text-base">{title}</h1>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <p className="text-right text-sm leading-tight">
            <span className="text-muted-foreground">Olá,</span>{" "}
            <strong>{session?.user.name}</strong>
          </p>
        </div>
      </div>
    </header>
  );
}
