"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUpdateChecklistItem } from "@/features/commercial/hooks/use-update-checklist-item";
import { checklistItemTypeMapping } from "@/features/commercial/lib/checklist-item-type-mapping";
import {
  type ChecklistItem,
  ChecklistType,
} from "@/features/commercial/types/commercial-types";

const formSchema = z.object({
  label: z
    .string()
    .min(1, "Campo obrigatório")
    .max(255, "O campo deve ter no máximo 255 caracteres"),
  type: z.enum(ChecklistType),
});

type EditChecklistItemData = z.infer<typeof formSchema>;

interface ChecklistItemEditSheetProps {
  item: ChecklistItem | null;
  onOpenChange: (open: boolean) => void;
}

export function ChecklistItemEditSheet({
  item,
  onOpenChange,
}: ChecklistItemEditSheetProps) {
  const { mutate: updateItem, isPending } = useUpdateChecklistItem();

  const form = useForm<EditChecklistItemData>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: "", type: ChecklistType.BASE },
  });

  useEffect(() => {
    if (item) {
      form.reset({ label: item.label, type: item.type });
    }
  }, [item, form]);

  function onSubmit(data: EditChecklistItemData) {
    if (!item) return;
    updateItem(
      { id: item.id, type: item.type, label: data.label },
      { onSuccess: () => onOpenChange(false) },
    );
  }

  return (
    <Sheet open={!!item} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Editar item</SheetTitle>
          <SheetDescription>
            Atualize as informações do item do checklist.
          </SheetDescription>
        </SheetHeader>

        <form
          id="form-edit-checklist-item"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-8 py-4"
        >
          <FieldGroup>
            <Controller
              name="label"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel isRequired htmlFor={field.name}>
                    Label
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex. Realizar pedidos"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription>
                    A label é como aparece no dashboard.
                  </FieldDescription>
                </Field>
              )}
            />

            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel
                      isRequired
                      htmlFor="form-edit-checklist-item-select-type"
                    >
                      Tipo
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-edit-checklist-item-select-type"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectGroup>
                        <SelectLabel>Tipo</SelectLabel>
                        {Object.entries(checklistItemTypeMapping).map(
                          ([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ),
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {form.formState.errors.root && (
              <FieldError errors={[form.formState.errors.root]} />
            )}
          </FieldGroup>
        </form>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-edit-checklist-item"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
