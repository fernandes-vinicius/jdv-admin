"use client";

import { useState } from "react";
import { UserPlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/features/users/components/create-user-dialog";

export function CreateUserButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full sm:w-auto sm:shrink-0">
        <UserPlusIcon />
        Adicionar membro
      </Button>
      <CreateUserDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
