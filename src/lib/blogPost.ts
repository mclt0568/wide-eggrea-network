import Color from "color";
import type { Optional } from "./types";

export type BlogPostMeta = {
  blogId: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  cover: Optional<string>;
  date: [number, number, number];
  color: Color;
  attachments: string[];
}

export type BlogCategory = "journal" | "life-backup" | "talk" | "system" ;

export const categoryNameLookup: {[key: string]: string} = {
  "journal": "日常日誌",
  "life-backup": "人生備份",
  "talk": "日常日誌",
  "system": "系統"
};

export type BlogPost = {
  blogId: string;
  meta: BlogPostMeta;
  content: string;
};