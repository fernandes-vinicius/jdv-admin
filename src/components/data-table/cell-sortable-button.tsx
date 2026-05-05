"use client";

import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type CellSortableButtonProps<T> = React.ComponentProps<typeof Button> & {
  column: Column<T, unknown>;
};

export function CellSortableButton<T>(props: CellSortableButtonProps<T>) {
  const { column, children, ...rest } = props;

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      {...rest}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
