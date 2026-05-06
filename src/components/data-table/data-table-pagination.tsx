"use client";

import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  return (
    <div className="flex items-center justify-end gap-4 py-4">
      <span className="text-muted-foreground text-xs">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </span>

      <Separator orientation="vertical" />

      <div className="inline-flex items-center gap-1.5">
        <Button
          variant="outline"
          size="xs"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
