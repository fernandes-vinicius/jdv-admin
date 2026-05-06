"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchFilterProps<T> = React.ComponentProps<typeof Input> & {
  columnName: string;
  table: Table<T>;
};

export function DataTableSearchFilter<T>(props: SearchFilterProps<T>) {
  const { columnName, table, className, ...rest } = props;

  return (
    <Input
      placeholder="Buscar..."
      value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(columnName)?.setFilterValue(event.target.value)
      }
      className={cn("sm:max-w-sm", className)}
      {...rest}
    />
  );
}
