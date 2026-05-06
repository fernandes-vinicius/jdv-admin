import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  const baseSlug = value
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "") // remove caracteres especiais
    .replace(/\s+/g, "_"); // espaços -> _

  const uniqueSuffix = `${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .substring(2, 6)}`;

  return `${baseSlug}_${uniqueSuffix}`;
}
