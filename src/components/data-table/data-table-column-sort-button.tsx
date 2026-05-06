"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CellSortableButtonProps<T> = React.ComponentProps<typeof Button> & {
  column: Column<T, unknown>;
};

export function DataTableColumnSortButton<T>(
  props: CellSortableButtonProps<T>,
) {
  const { column, className, children, ...rest } = props;

  return (
    <Button
      size="xs"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={cn("px-1 text-left", className)}
      {...rest}
    >
      {children}
      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
    </Button>
  );
}
