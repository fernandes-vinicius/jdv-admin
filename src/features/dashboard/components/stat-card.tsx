import { CountUp } from "@/components/count-up";
import type { IconComponentType } from "@/components/icons";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  icon: IconComponentType;
  iconClassName?: string;
  className?: string;
}

export function StatCard(props: StatCardProps) {
  const { label, value, icon: Icon, className, iconClassName } = props;

  return (
    <Card className={cn("relative h-full", className)}>
      <CardAction className="absolute top-4 right-4">
        <div
          className={cn(
            "flex size-8 shrink-0 items-center justify-center bg-primary/10 text-primary",
            iconClassName,
          )}
        >
          <Icon className="size-4" />
        </div>
      </CardAction>
      <CardHeader className="my-auto text-center">
        <CardTitle className="text-[clamp(1.5rem,4vw,2.25rem)]!">
          <CountUp start={0} end={value} />
        </CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
    </Card>
  );
}
