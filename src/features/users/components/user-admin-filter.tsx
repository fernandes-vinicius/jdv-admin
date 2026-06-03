"use client";

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
  UserAdminFilterKey,
  useUserAdminFilter,
} from "@/features/users/hooks/use-user-admin-filter";

export function UserAdminFilter() {
  const { key, setKey } = useUserAdminFilter();

  return (
    <Select value={key} onValueChange={(v) => setKey(v as UserAdminFilterKey)}>
      <SelectTrigger className="w-full sm:w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de usuário</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="true">Admin</SelectItem>
          <SelectItem value="false">Membro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
