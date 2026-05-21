"use client";

import { useEffect, useState } from "react";
import { LeafIcon } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBuildings } from "@/features/building/hooks/use-buildings";
import type { User } from "@/features/users/types/users-types";

interface UserAccessSheetProps {
  user: User | null;
  onOpenChange: (open: boolean) => void;
}

export function UserAccessSheet({ user, onOpenChange }: UserAccessSheetProps) {
  const [selectedBuildingIds, setSelectedBuildingIds] = useState<number[]>([]);
  const { data: buildings = [] } = useBuildings();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    setSelectedBuildingIds([]);
  }, [user?.id]);

  const allSelected =
    buildings.length > 0 && selectedBuildingIds.length === buildings.length;
  const someSelected =
    selectedBuildingIds.length > 0 &&
    selectedBuildingIds.length < buildings.length;

  function toggleAll() {
    if (allSelected) {
      setSelectedBuildingIds([]);
    } else {
      setSelectedBuildingIds(buildings.map((b) => b.empreendimento_id));
    }
  }

  function toggleBuilding(id: number) {
    setSelectedBuildingIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  return (
    <Sheet open={!!user} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[95vh] min-h-[95vh]">
        <SheetHeader className="border-b">
          <SheetTitle>Acessos — {user?.name}</SheetTitle>
          <SheetDescription>{user?.email}</SheetDescription>
        </SheetHeader>

        {!user && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <LeafIcon />
              </EmptyMedia>
              <EmptyTitle>Nenhum usuário</EmptyTitle>
              <EmptyDescription>Nenhum usuário encontrado</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {user && (
          <section className="flex flex-col overflow-y-auto p-8">
            <div className="mb-8 space-y-1.5">
              <h3 className="font-semibold uppercase tracking-wider">
                Gerenciar acessos
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Configure quais painéis e empreendimentos este usuário poderá
                ter acesso.
              </p>
            </div>

            <Accordion type="single" collapsible className="border">
              <AccordionItem value="empreendimentos" className="border-b px-4">
                <AccordionTrigger>
                  <span>Empreendimentos</span>
                  {selectedBuildingIds.length > 0 && (
                    <span className="mr-2 ml-auto font-normal text-muted-foreground text-xs">
                      {selectedBuildingIds.length} selecionado
                      {selectedBuildingIds.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </AccordionTrigger>
                <AccordionContent className="h-auto">
                  <FieldGroup className="gap-2 pb-2">
                    <Field orientation="horizontal">
                      <Checkbox
                        id="select-all-buildings"
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
                        htmlFor="select-all-buildings"
                        className="cursor-pointer font-medium"
                      >
                        Selecionar todos
                      </Label>
                    </Field>

                    <FieldSeparator />

                    {buildings.map((building) => (
                      <FieldLabel key={building.empreendimento_id}>
                        <Field orientation="horizontal">
                          <Checkbox
                            id={`building-${building.empreendimento_id}`}
                            checked={selectedBuildingIds.includes(
                              building.empreendimento_id,
                            )}
                            onCheckedChange={() =>
                              toggleBuilding(building.empreendimento_id)
                            }
                          />
                          <FieldContent>
                            <FieldTitle>{building.name}</FieldTitle>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    ))}
                  </FieldGroup>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="panels" className="px-4">
                <AccordionTrigger>Painéis</AccordionTrigger>
                <AccordionContent className="h-auto" />
              </AccordionItem>
            </Accordion>
          </section>
        )}
      </SheetContent>
    </Sheet>
  );
}
