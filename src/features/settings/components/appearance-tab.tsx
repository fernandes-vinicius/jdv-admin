"use client";

import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/icons";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const themes = [
  {
    value: "system",
    label: "Dispositivo",
    description: "Use o tema do seu sistema operacional",
    icon: MonitorIcon,
  },
  {
    value: "dark",
    label: "Tema escuro",
    description: "Interface em fundo escuro",
    icon: MoonIcon,
  },
  {
    value: "light",
    label: "Tema claro",
    description: "Interface em fundo claro",
    icon: SunIcon,
  },
];

export function AppearanceTab() {
  const { theme, setTheme } = useTheme();

  return (
    <section className="flex flex-col gap-6 xl:gap-8">
      <div className="flex flex-col gap-1.5">
        <h3 className="scroll-m-28 font-heading font-medium text-lg tracking-tight">
          Tema
        </h3>
        <p className="text-balance leading-relaxed">
          Escolha como o sistema deve ser exibido.
        </p>
        <p className="text-balance text-muted-foreground leading-relaxed">
          Pressione a tecla <strong>D</strong> para alternar entre o tema escuro
          e o tema claro mais rapidamente sempre que precisar.
        </p>
      </div>

      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        className="grid items-stretch gap-6 xl:grid-cols-3 xl:gap-8"
      >
        {themes.map(({ value, label, description, icon: Icon }) => (
          <label key={value} htmlFor={value} className="h-full w-full">
            <Card size="sm" className="h-full">
              <CardHeader>
                <CardAction>
                  <RadioGroupItem value={value} id={value} />
                </CardAction>
                <CardTitle className="text-sm xl:text-base">
                  <span className="inline-flex items-center gap-2.5 leading-none">
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </section>
  );
}
