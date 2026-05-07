"use client";

import { ShieldCheck, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LiveClock } from "@/components/live-clock";
import { Badge } from "@/components/ui/badge";
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
  const isAdmin = session?.user?.is_admin ?? false;

  return (
    <header
      className={cn(
        "flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger title="Abrir/fechar menu lateral" className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 my-auto data-[orientation=vertical]:h-4"
        />
        <h1 className="font-medium text-base">{title}</h1>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          {session?.user && (
            <>
              <Badge
                variant={isAdmin ? "default" : "secondary"}
                className="items-center leading-none"
              >
                {isAdmin ? (
                  <ShieldCheck className="size-3" />
                ) : (
                  <User className="size-3" />
                )}
                {isAdmin ? "Admin" : "Membro"}
              </Badge>
              <Separator
                orientation="vertical"
                className="my-auto data-[orientation=vertical]:h-4"
              />
            </>
          )}
          <LiveClock />
        </div>
      </div>
    </header>
  );
}
