import { Geist_Mono, Outfit } from "next/font/google";

export const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
