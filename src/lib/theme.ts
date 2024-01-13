import { writable } from "svelte/store";
import defaultLight from "@/assets/themes/default-light.json";
import type Color from "color";

export function themeToRawStyle(theme: any): string{
  let raw_style = "";
  for (const style in theme){
    const value = theme[style];
    raw_style += `${style}: ${value};`;
  }

  return raw_style;
}

export const styleStore = writable(defaultLight);

export function computeLightForeground(color: Color){
  return color.lighten(0.9).lighten(0.3).whiten(0.1);
}