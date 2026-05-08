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
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/building">Ver todos</Link>
          </Button>
        </CardAction>
        <CardTitle>Empreendimentos</CardTitle>
        <CardDescription>{buildings.length} cadastrados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
