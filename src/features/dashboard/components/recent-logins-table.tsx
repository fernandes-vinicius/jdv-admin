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

interface User {
  id: string | number;
  name: string;
  email: string;
  last_login_at: string;
}

interface RecentLoginsTableProps {
  users: User[];
}

export function RecentLoginsTable({ users }: RecentLoginsTableProps) {
  if (users.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardAction>
          <Button asChild variant="outline" className="mx-auto">
            <Link href="/users">Ver todos</Link>
          </Button>
        </CardAction>
        <CardTitle>últimos acessos</CardTitle>
        <CardDescription>{users.length} últimos</CardDescription>
      </CardHeader>
      <CardContent className="lg:max-h-100 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Último acesso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {u.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(u.last_login_at).toLocaleString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
