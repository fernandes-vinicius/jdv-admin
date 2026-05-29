"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoginHistory } from "@/features/auth/hooks/use-login-history";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function parseUserAgent(ua: string) {
  if (!ua) return "Desconhecido";
  if (/iPhone|iPad|iOS/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return ua.slice(0, 40);
}

export function LoginHistoryTable() {
  const { data: entries = [], isPending } = useLoginHistory();

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={String(i)} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Nenhum acesso registrado.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Data</th>
            <th className="px-4 py-2 text-left font-medium">IP</th>
            <th className="px-4 py-2 text-left font-medium">Dispositivo</th>
            <th className="px-4 py-2 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-t">
              <td className="px-4 py-2 tabular-nums whitespace-nowrap">
                {formatDate(entry.login_at)}
              </td>
              <td className="px-4 py-2 font-mono text-xs">
                {entry.ip_address || "—"}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {parseUserAgent(entry.user_agent)}
              </td>
              <td className="px-4 py-2">
                <Badge variant={entry.success ? "default" : "destructive"}>
                  {entry.success ? "Sucesso" : "Falha"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
