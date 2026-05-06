import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function Page({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="page"
      className={cn(
        "@container/main flex flex-1 flex-col gap-8 py-8",
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
      className={cn("flex flex-col items-start gap-1.5 px-8", className)}
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
        "text-[1.05rem] text-muted-foreground sm:text-balance sm:text-base md:max-w-[80%]",
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
      className={cn("relative flex flex-col gap-4 px-8", className)}
      {...props}
    />
  );
}

export {
  Page,
  PageHeader,
  PageTagline,
  PageTitle,
  PageDescription,
  PageContent,
};
