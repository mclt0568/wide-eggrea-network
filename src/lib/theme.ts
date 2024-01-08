import { writable } from "svelte/store";
import defaultLight from "@/assets/themes/default-light.json";

export function themeToRawStyle(theme: any): string{
  let raw_style = "";
  for (const style in theme){
    const value = theme[style];
    raw_style += `${style}: ${value};`;
  }

  return raw_style;
}

export const styleStore = writable(defaultLight);