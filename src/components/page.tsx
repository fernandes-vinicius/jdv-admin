import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function Page({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="page"
      className={cn(
        "@container/main flex flex-1 flex-col gap-6 py-6 sm:gap-8 sm:py-8",
        className,
      )}
      {...props}
    />
  );
}

function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-col items-start gap-1.5 px-6 sm:px-8",
        className,
      )}
      {...props}
    />
  );
}

function PageTagline({
  className,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge data-slot="page-tagline" className={cn(className)} {...props} />
  );
}

function PageTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="page-title"
      className={cn(
        "scroll-m-24 font-semibold text-3xl tracking-tight sm:text-3xl",
        className,
      )}
      {...props}
    />
  );
}

function PageDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-description"
      className={cn(
        "text-[1.05rem] text-muted-foreground sm:text-balance sm:text-base md:max-w-[60%]",
        className,
      )}
      {...props}
    />
  );
}

function PageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-content"
      className={cn("flex flex-col gap-6 px-6 sm:gap-8 sm:px-8", className)}
      {...props}
    />
  );
}

function PageSection({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="page-section"
      className={cn(
        "flex scroll-mt-24 flex-col items-stretch gap-6 sm:gap-8 xl:w-full xl:flex-row xl:gap-16",
        className,
      )}
      {...props}
    />
  );
}

function PageSectionSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-section-sidebar"
      className={cn(
        "z-30 flex w-full flex-col gap-6 overscroll-none xl:sticky xl:top-[calc(var(--header-height)+1px)] xl:ml-auto xl:min-h-[90svh] xl:w-(--sidebar-width) xl:gap-8 xl:self-start",
        className,
      )}
      {...props}
    >
      {/* <div className="h-(--top-spacing) shrink-0" /> */}
      <div className="flex flex-col gap-6 sm:gap-8">{children}</div>
    </div>
  );
}

function PageSectionSidebarTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="page-section-sidebar-title"
      className={cn(
        "scroll-m-28 font-heading font-medium text-lg tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function PageSectionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-section-content"
      className={cn("flex min-w-0 flex-1 flex-col", className)}
      {...props}
    >
      {/* <div className="h-(--top-spacing) shrink-0" /> */}
      <div className="flex w-full min-w-0 flex-1 flex-col gap-6 md:px-0 xl:mx-auto xl:min-h-0 xl:max-w-full xl:gap-8">
        {children}
      </div>
    </div>
  );
}

export {
  Page,
  PageHeader,
  PageTagline,
  PageTitle,
  PageDescription,
  PageContent,
  PageSection,
  PageSectionSidebar,
  PageSectionSidebarTitle,
  PageSectionContent,
};
