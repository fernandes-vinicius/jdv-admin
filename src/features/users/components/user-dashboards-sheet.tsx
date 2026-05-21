"use client";

import { useEffect, useState } from "react";
import { LayoutDashboardIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboards } from "@/features/dashboards/hooks/use-dashboards";
import { useSaveUserDashboards } from "@/features/users/hooks/use-save-user-dashboards";
import { useUserDashboards } from "@/features/users/hooks/use-user-dashboards";
import type { User } from "@/features/users/types/users-types";

interface UserDashboardsSheetProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
}

export function UserDashboardsSheet({
  user,
  onOpenChange,
}: UserDashboardsSheetProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: dashboards = [], isPending: isDashboardsPending } =
    useDashboards();
  const { data: userPermissions = [], isPending: isPermissionsPending } =
    useUserDashboards(user?.id);
  const { mutateAsync: savePermissions, isPending: isSaving } =
    useSaveUserDashboards();

  const isPending = isDashboardsPending || isPermissionsPending;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (!isPermissionsPending) {
      setSelectedIds(userPermissions.map((p) => p.dashboard_id));
    }
  }, [user?.id, isPermissionsPending]);

  const allSelected =
    dashboards.length > 0 && selectedIds.length === dashboards.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < dashboards.length;

  function toggleAll() {
    setSelectedIds(allSelected ? [] : dashboards.map((d) => d.id));
  }

  function toggleDashboard(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  async function handleSubmit() {
    if (!user) return;
    await savePermissions({
      userId: user.id,
      selectedIds,
      originalPermissions: userPermissions,
    });
    onOpenChange(false);
  }

  return (
    <Sheet open={!!user} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dashboards — {user?.name}</SheetTitle>
          <SheetDescription>
            Selecione quais dashboards {user?.name} poderá ter acesso.
          </SheetDescription>
        </SheetHeader>

        {!user && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <LayoutDashboardIcon />
              </EmptyMedia>
              <EmptyTitle>Nenhum usuário</EmptyTitle>
              <EmptyDescription>Nenhum usuário selecionado</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {user && (
          <section className="flex flex-col gap-6 overflow-y-auto">
            {isPending && (
              <div className="flex flex-col gap-2 px-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={String(i)} className="h-10 w-full" />
                ))}
              </div>
            )}

            {!isPending && dashboards.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <LayoutDashboardIcon />
                  </EmptyMedia>
                  <EmptyTitle>Sem dashboards</EmptyTitle>
                  <EmptyDescription>
                    Nenhum dashboard ativo encontrado.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}

            {!isPending && dashboards.length > 0 && (
              <FieldGroup className="gap-4 px-8">
                <Field orientation="horizontal">
                  <Checkbox
                    id="select-all-dashboards"
                    checked={
                      allSelected
                        ? true
                        : someSelected
                          ? "indeterminate"
                          : false
                    }
                    onCheckedChange={toggleAll}
                  />
                  <Label
                    htmlFor="select-all-dashboards"
                    className="cursor-pointer font-medium"
                  >
                    Selecionar todos
                  </Label>
                </Field>

                <FieldSeparator />

                {dashboards.map((dashboard) => (
                  <Field key={dashboard.id} orientation="horizontal">
                    <Checkbox
                      id={`dashboard-${dashboard.id}`}
                      checked={selectedIds.includes(dashboard.id)}
                      onCheckedChange={() => toggleDashboard(dashboard.id)}
                    />
                    <FieldContent>
                      <Label
                        htmlFor={`dashboard-${dashboard.id}`}
                        className="cursor-pointer"
                      >
                        <FieldTitle>{dashboard.name}</FieldTitle>
                      </Label>
                      {dashboard.description && (
                        <p className="text-muted-foreground text-xs">
                          {dashboard.description}
                        </p>
                      )}
                    </FieldContent>
                  </Field>
                ))}
              </FieldGroup>
            )}
          </section>
        )}

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!user || isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
