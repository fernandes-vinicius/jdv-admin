import {
  Bell,
  Coffee,
  GraduationCap,
  type LucideIcon,
  Megaphone,
  PartyPopper,
  PhoneCall,
  Smartphone,
  Sword,
  Swords,
  Target,
  Theater,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FieldAction } from "@/features/commercial/field-action/types/field-action-types";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Target,
  Swords,
  Bell,
  Theater,
  Megaphone,
  Sword,
  Smartphone,
  Coffee,
  PhoneCall,
  PartyPopper,
};

const ACCENT_CLASSES: Record<string, { bg: string; text: string }> = {
  slate: { bg: "bg-slate-500/10", text: "text-slate-500" },
  gray: { bg: "bg-gray-500/10", text: "text-gray-500" },
  zinc: { bg: "bg-zinc-500/10", text: "text-zinc-500" },
  stone: { bg: "bg-stone-500/10", text: "text-stone-500" },
  red: { bg: "bg-red-500/10", text: "text-red-500" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-500" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-500" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-500" },
  lime: { bg: "bg-lime-500/10", text: "text-lime-500" },
  green: { bg: "bg-green-500/10", text: "text-green-500" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-500" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
  sky: { bg: "bg-sky-500/10", text: "text-sky-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  violet: { bg: "bg-violet-500/10", text: "text-violet-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500" },
  fuchsia: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-500" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-500" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-500" },
};

interface FieldActionsTableProps {
  fieldActions: FieldAction[];
}

export function FieldActionsTable({ fieldActions }: FieldActionsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/commercial/field-actions">Ver todas</Link>
          </Button>
        </CardAction>
        <CardTitle>Armas</CardTitle>
        <CardDescription>{fieldActions.length} recentes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Nome</TableHead>
              <TableHead>Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fieldActions.map((item) => {
              const Icon = ICON_MAP[item.icon_name];
              const accent = ACCENT_CLASSES[item.accent];
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {Icon && (
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center ${accent?.bg ?? "bg-primary/10"} ${accent?.text ?? "text-primary"}`}
                      >
                        <Icon className="size-3.5" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{item.nome}</span>
                      {item.descricao && (
                        <span className="text-muted-foreground text-xs">
                          {item.descricao}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.resultado}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
