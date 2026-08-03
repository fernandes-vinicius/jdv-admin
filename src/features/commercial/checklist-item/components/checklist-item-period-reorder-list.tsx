"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { ClockIcon, GripVerticalIcon, PlusIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CHECKLIST_ICONS } from "@/features/commercial/checklist-item/components/checklist-icon-select";
import { useChecklistItems } from "@/features/commercial/checklist-item/hooks/use-checklist-items";
import { useChecklistPageTab } from "@/features/commercial/checklist-item/hooks/use-checklist-page-tab";
import { useReorderChecklistItems } from "@/features/commercial/checklist-item/hooks/use-reorder-checklist-items";
import {
  checklistItemPeriodMapping,
  checklistItemPeriodTheme,
} from "@/features/commercial/checklist-item/lib/checklist-item-period-mapping";
import {
  groupDailyItemsByPeriod,
  reorderIds,
} from "@/features/commercial/checklist-item/lib/checklist-item-reorder";
import {
  type ChecklistItem,
  ChecklistPeriod,
  ChecklistType,
} from "@/features/commercial/checklist-item/types/checklist-item-types";
import { cn } from "@/lib/utils";

const PERIODS = [
  ChecklistPeriod.MORNING,
  ChecklistPeriod.AFTERNOON,
  ChecklistPeriod.EVENING,
] as const;

function formatTime(value?: string) {
  return value ? value.slice(0, 5) : null;
}

function SortableRow({
  item,
  itemIconClassName,
}: {
  item: ChecklistItem;
  itemIconClassName: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const iconEntry = CHECKLIST_ICONS.find((i) => i.id === item.icon_name);
  const start = formatTime(item.start_time);
  const end = formatTime(item.end_time);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 border border-ring/20 bg-card p-3 transition-shadow",
        isDragging && "z-10 rotate-1 shadow-lg ring-1 ring-primary/40",
      )}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Arrastar ${item.label}`}
        className="shrink-0 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
      >
        <GripVerticalIcon className="size-4" />
      </button>
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center",
          itemIconClassName,
        )}
      >
        {iconEntry && <iconEntry.Icon className="size-4" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">{item.label}</p>
        {start && end && (
          <p className="mt-0.5 flex items-center gap-1 text-muted-foreground text-xs">
            <ClockIcon className="size-3" />
            {start} – {end}
          </p>
        )}
      </div>
    </div>
  );
}

interface PeriodColumnProps {
  period: ChecklistPeriod;
  items: ChecklistItem[];
  onReorder: (itemIds: string[]) => void;
}

function PeriodColumn({ period, items, onReorder }: PeriodColumnProps) {
  const sensors = useSensors(useSensor(PointerSensor));
  const [, setTab] = useChecklistPageTab();
  const { label } = checklistItemPeriodMapping[period];
  const theme = checklistItemPeriodTheme[period];
  const ids = items.map((item) => item.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(reorderIds(ids, String(active.id), String(over.id)));
  }

  return (
    <Card size="sm" className="h-full gap-0 overflow-hidden py-0! sm:min-h-svh">
      <CardHeader className={cn("py-5", theme.headerClassName)}>
        <div className="row-span-full flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-none border border-white/20 bg-white/20 text-inherit">
            <theme.Icon className="size-4.5" />
          </div>

          <div>
            <CardTitle className="text-inherit leading-none">{label}</CardTitle>
            <CardDescription className="text-inherit opacity-80">
              {items.length} {items.length === 1 ? "tarefa" : "tarefas"}
            </CardDescription>
          </div>
        </div>

        <CardAction>
          <Badge
            variant="outline"
            className="gap-1 border-transparent bg-white p-1 text-black shadow-sm"
          >
            <ClockIcon />
            {theme.timeLabel}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent
        className={cn(
          "flex flex-1 flex-col gap-2.5 py-5",
          theme.contentClassName,
        )}
      >
        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nenhum item ainda.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              {items.map((item) => (
                <SortableRow
                  key={item.id}
                  item={item}
                  itemIconClassName={theme.itemIconClassName}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}

        <Button
          size="sm"
          type="button"
          variant="outline"
          className={cn("mt-2.5 w-full border-dashed", theme.btnClassname)}
          onClick={() => setTab("itens")}
        >
          <PlusIcon />
          Adicionar item
        </Button>
      </CardContent>
    </Card>
  );
}

export function ChecklistItemPeriodReorderList() {
  const { data, isPending, isError } = useChecklistItems(ChecklistType.DAILY);
  const { mutate: reorder } = useReorderChecklistItems();

  const [groups, setGroups] = useState(() =>
    groupDailyItemsByPeriod(data ?? []),
  );

  useEffect(() => {
    setGroups(groupDailyItemsByPeriod(data ?? []));
  }, [data]);

  if (isPending) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PERIODS.map((period) => (
          <Skeleton key={period} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Erro ao carregar itens do checklist.
      </p>
    );
  }

  function handleReorder(period: ChecklistPeriod, newIds: string[]) {
    setGroups((prev) => {
      const byId = new Map(prev[period].map((item) => [item.id, item]));
      return {
        ...prev,
        [period]: newIds
          .map((id) => byId.get(id))
          .filter((item): item is ChecklistItem => item !== undefined),
      };
    });
    reorder({ period, item_ids: newIds });
  }

  return (
    <div className="flex-1 space-y-5">
      <div>
        <p className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
          Reordenar rotina diária
        </p>
        <p className="max-w-xl text-muted-foreground text-sm leading-relaxed">
          Arraste os cards para ajustar a ordem de exibição dentro de cada
          período. O período é calculado automaticamente pelo horário de fim de
          cada tarefa.
        </p>
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PERIODS.map((period) => (
          <PeriodColumn
            key={period}
            period={period}
            items={groups[period]}
            onReorder={(ids) => handleReorder(period, ids)}
          />
        ))}
      </div>
    </div>
  );
}
