import Color from "color";
import type { Optional } from "./types";
import { listDocuments } from "./database";
import { writable, type Writable } from "svelte/store";

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

export async function getBlogs(){
  let raw = await listDocuments("blogPosts");
  let result: {[key: string]: BlogPostMeta} = {};
  for (const [id, data] of Object.entries(raw)){
    let meta: BlogPostMeta = {
      blogId: id,
      title: data.title,
      description: data.description,
      category: data.category,
      tags: data.tags,
      cover: (data.cover === "") ? null : data.cover,
      date: data.date,
      color: Color(data.color),
      attachments: data.attachments,
    };
    result[id] = meta;
  }
  return result;
}

export async function syncBlogs(){
  const blogs = await getBlogs();
  blogMetaStore.set(blogs);
}

let currentBlogPosts: {[key: string]: BlogPostMeta} = {};
export const blogMetaStore: Writable<{[key: string]: BlogPostMeta}> = writable({});
blogMetaStore.subscribe(value => {currentBlogPosts = value;});