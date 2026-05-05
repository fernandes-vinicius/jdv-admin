"use client";

import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SiteHeaderProps = React.ComponentProps<"header"> & {
  title: string;
};

export function SiteHeader({
  title,
  className,
  children,
  ...props
}: SiteHeaderProps) {
  const { data: session } = useSession();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center border-b bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="my-auto mr-2 h-4" />
        <h1 className="font-medium text-base">{title}</h1>

        <div className="hidden w-full sm:ml-auto sm:block sm:w-auto">
          <span className="text-right text-sm">
            <span className="text-muted-foreground">Olá</span>,{" "}
            {session?.user.name}!
          </span>
        </div>
      </div>
    </header>
  );
}
