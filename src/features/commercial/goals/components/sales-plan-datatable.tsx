"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { DataTableColumnSortButton } from "@/components/data-table/data-table-column-sort-button";
import { DataTableSearchFilter } from "@/components/data-table/datatable-search-filter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SalesPlanDataTableMenu } from "@/features/commercial/goals/components/sales-plan-data-table-menu";
import { useSalesPlans } from "@/features/commercial/goals/hooks/use-sales-plans";
import type {
  SalesPlan,
  SalesPlanMonth,
} from "@/features/commercial/goals/types/goals-types";

const MONTH_NAMES = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

// SVG attributes don't resolve CSS custom properties — read computed values
// and update whenever the theme class on <html> changes.
function useChartColors() {
  const [colors, setColors] = useState({
    bar: "oklch(0.785 0.115 274.713)",
    barHover: "oklch(0.585 0.233 277.117)",
    grid: "oklch(0.92 0.004 286.32)",
    axis: "oklch(0.552 0.016 285.938)",
  });

  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const get = (v: string) => s.getPropertyValue(v).trim();
      setColors({
        bar: get("--chart-1") || "oklch(0.785 0.115 274.713)",
        barHover: get("--chart-2") || "oklch(0.585 0.233 277.117)",
        grid: get("--border") || "oklch(0.92 0.004 286.32)",
        axis: get("--muted-foreground") || "oklch(0.552 0.016 285.938)",
      });
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}

function MonthlySalesDetail({
  months,
  vendas_total,
}: {
  months: SalesPlanMonth[];
  vendas_total: number;
}) {
  const colors = useChartColors();
  const chartData = [...months]
    .sort((a, b) => a.month - b.month)
    .map((m) => ({ name: MONTH_NAMES[m.month - 1], vendas: m.planned_sales }));

  const avg = Math.round(
    vendas_total / (chartData.filter((m) => m.vendas > 0).length || 1),
  );
  const peak = chartData.reduce(
    (a, b) => (b.vendas > a.vendas ? b : a),
    chartData[0],
  );

  return (
    <div className="border-t bg-muted/20 px-4 py-4">
      <div className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-muted-foreground text-xs">
        <span className="font-medium text-foreground text-sm">
          Vendas mensais planejadas
        </span>
        <span>
          Total:{" "}
          <span className="font-semibold text-foreground">{vendas_total}</span>
        </span>
        <span>
          Média/mês:{" "}
          <span className="font-semibold text-foreground">{avg}</span>
        </span>
        {peak && (
          <span>
            Pico:{" "}
            <span className="font-semibold text-foreground">
              {peak.name} ({peak.vendas})
            </span>
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart
          data={chartData}
          margin={{ top: 4, right: 4, bottom: 0, left: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={colors.grid}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: colors.axis }}
          />
          <Tooltip
            cursor={{ fill: colors.barHover, opacity: 0.15, radius: 4 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-md border bg-background px-3 py-1.5 text-xs shadow-lg">
                  <p className="text-muted-foreground">{label}</p>
                  <p className="font-semibold text-foreground">
                    {payload[0]?.value} vendas
                  </p>
                </div>
              );
            }}
          />
          <Bar
            dataKey="vendas"
            fill={colors.bar}
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const columns: ColumnDef<SalesPlan>[] = [
  {
    accessorKey: "empreendimento_name",
    header: ({ column }) => (
      <DataTableColumnSortButton column={column}>
        Empreendimento
      </DataTableColumnSortButton>
    ),
  },
  {
    accessorKey: "year",
    size: 80,
    header: ({ column }) => (
      <div className="text-center">
        <DataTableColumnSortButton column={column}>
          Ano
        </DataTableColumnSortButton>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.year}</div>
    ),
  },
  {
    accessorKey: "estoque_inicial",
    size: 110,
    header: () => <div className="text-center">Est. Inicial</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.estoque_inicial}
      </div>
    ),
  },
  {
    accessorKey: "vendas_total",
    size: 110,
    header: () => <div className="text-center">Total Planejado</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.original.vendas_total}</div>
    ),
  },
  {
    accessorKey: "estoque_final",
    size: 110,
    header: () => <div className="text-center">Est. Final</div>,
    cell: ({ row }) => (
      <div className="text-center text-muted-foreground">
        {row.original.estoque_final}
      </div>
    ),
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <SalesPlanDataTableMenu item={row.original} />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => row.toggleExpanded()}
          aria-label={
            row.getIsExpanded() ? "Recolher detalhes" : "Ver detalhes mensais"
          }
        >
          <ChevronDown
            className="h-4 w-4 transition-transform duration-200"
            style={{
              transform: row.getIsExpanded()
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          />
        </Button>
      </div>
    ),
  },
];

export function SalesPlanDataTable() {
  const { data = [], isPending, isError } = useSalesPlans();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, expanded },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Erro ao carregar metas de vendas.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <DataTableSearchFilter
        table={table}
        columnName="empreendimento_name"
        placeholder="Buscar por empreendimento..."
      />

      <div className="overflow-hidden border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={columns.length} className="p-0">
                        <MonthlySalesDetail
                          months={row.original.months}
                          vendas_total={row.original.vendas_total}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
