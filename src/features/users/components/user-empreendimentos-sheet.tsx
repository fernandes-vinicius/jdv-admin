"use client";

import { useEffect, useState } from "react";
import { Building2Icon } from "@/components/icons";
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
import { useBuildings } from "@/features/building/hooks/use-buildings";
import { useSaveUserProjects } from "@/features/users/hooks/use-save-user-projects";
import { useUserProjects } from "@/features/users/hooks/use-user-projects";
import type { User } from "@/features/users/types/users-types";

interface UserEmpreendimentosSheetProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
}

export function UserEmpreendimentosSheet({
  user,
  onOpenChange,
}: UserEmpreendimentosSheetProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data: buildings = [], isPending: isBuildingsPending } =
    useBuildings();
  const { data: userProjects = [], isPending: isProjectsPending } =
    useUserProjects(user?.id ?? "");
  const { mutateAsync: saveProjects, isPending: isSaving } =
    useSaveUserProjects();

  const isPending = isBuildingsPending || isProjectsPending;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    if (!isProjectsPending) {
      setSelectedIds(userProjects.map((p) => p.empreendimento_id));
    }
  }, [user?.id, isProjectsPending]);

  const allSelected =
    buildings.length > 0 && selectedIds.length === buildings.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < buildings.length;

  function toggleAll() {
    setSelectedIds(
      allSelected ? [] : buildings.map((b) => b.empreendimento_id),
    );
  }

  function toggleBuilding(empreendimentoId: number) {
    setSelectedIds((prev) =>
      prev.includes(empreendimentoId)
        ? prev.filter((id) => id !== empreendimentoId)
        : [...prev, empreendimentoId],
    );
  }

  async function handleSubmit() {
    if (!user) return;
    await saveProjects({ userId: user.id, projectIds: selectedIds });
    onOpenChange(false);
  }

  return (
    <Sheet open={!!user} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Empreendimentos — {user?.name}</SheetTitle>
          <SheetDescription>
            Selecione quais empreendimentos {user?.name} poderá ter acesso.
          </SheetDescription>
        </SheetHeader>

        {!user && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Building2Icon />
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

            {!isPending && buildings.length === 0 && (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Building2Icon />
                  </EmptyMedia>
                  <EmptyTitle>Sem empreendimentos</EmptyTitle>
                  <EmptyDescription>
                    Nenhum empreendimento encontrado.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}

            {!isPending && buildings.length > 0 && (
              <FieldGroup className="gap-4 px-8">
                <Field orientation="horizontal">
                  <Checkbox
                    id="select-all-empreendimentos"
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
                    htmlFor="select-all-empreendimentos"
                    className="cursor-pointer font-medium"
                  >
                    Selecionar todos
                  </Label>
                </Field>

                <FieldSeparator />

                {buildings.map((building) => (
                  <Field
                    key={building.empreendimento_id}
                    orientation="horizontal"
                  >
                    <Checkbox
                      id={`building-${building.empreendimento_id}`}
                      checked={selectedIds.includes(building.empreendimento_id)}
                      onCheckedChange={() =>
                        toggleBuilding(building.empreendimento_id)
                      }
                    />
                    <FieldContent>
                      <Label
                        htmlFor={`building-${building.empreendimento_id}`}
                        className="cursor-pointer"
                      >
                        <FieldTitle>{building.name}</FieldTitle>
                      </Label>
                      {!building.is_active && (
                        <p className="text-muted-foreground text-xs">Inativo</p>
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
