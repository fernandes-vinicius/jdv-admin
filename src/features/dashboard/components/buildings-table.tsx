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
import type { Building } from "@/features/building/types/building-types";

interface BuildingsTableProps {
  buildings: Building[];
}

export function BuildingsTable({ buildings }: BuildingsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Empreendimentos</CardTitle>
        <CardDescription className="row-start-2 md:row-start-2">
          {buildings.length} cadastrados
        </CardDescription>
        <CardAction className="col-start-1 row-start-3 mr-auto md:col-start-2 md:row-start-1 md:mr-0">
          <Button asChild variant="outline">
            <Link href="/building">Ver todos</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16 text-center">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-center">Código Sienge</TableHead>
              <TableHead className="w-16 text-center">Ativo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="text-center text-muted-foreground">
                  {b.empreendimento_id}
                </TableCell>
                <TableCell>{b.name}</TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {b.codigo_interno_do_empreendimento ?? "—"}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    data-active={b.is_active}
                    className="p-1.5 font-semibold text-[0.625rem] uppercase leading-none tracking-widest data-[active=false]:bg-red-50 data-[active=true]:bg-emerald-50 data-[active=false]:text-red-700 data-[active=true]:text-emerald-700 dark:data-[active=false]:bg-red-500/10 dark:data-[active=true]:bg-emerald-500/10 dark:data-[active=false]:text-red-500 dark:data-[active=true]:text-emerald-500"
                  >
                    {b.is_active ? "Sim" : "Não"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
