import { writable, type Writable } from "svelte/store";

export type WindowMeta<T> = {
  windowId: string;
  windowIndex: number;
  windowType: WindowTypes;
  data: T;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  focused: boolean;
}

export type EmptyWindow = {};

export type WindowPayloadTypes = EmptyWindow;

export type WindowTypes = "empty" | "blog-catalogue";

let currentWindows: {[key: string]: WindowMeta<WindowPayloadTypes>} = {};
export let windowStore: Writable<{[key: string]: WindowMeta<WindowPayloadTypes>}> = writable(currentWindows);
windowStore.subscribe(value => {currentWindows = value});

export function updateWindow(newMeta: WindowMeta<WindowPayloadTypes>){
  newMeta.windowIndex = Object.entries(currentWindows).length;
  currentWindows[newMeta.windowId] = newMeta;
  windowStore.set(currentWindows);
  focusWindow(newMeta.windowId);
}

export function closeWindow(windowId: string){
  delete currentWindows[windowId];
  windowStore.set(currentWindows);
  if (Object.entries(currentWindows).length === 0){
    return;
  }
  
  let topMost = 0;
  let topMostId = "";
  for (const [id, meta] of Object.entries(currentWindows)){
    if (meta.windowIndex >= topMost){
      topMost = meta.windowIndex;
      topMostId = id;
    }
  }

  focusWindow(topMostId);
}

export function focusWindow(windowId: string){
  const oldIndex = currentWindows[windowId].windowIndex;
  currentWindows[windowId].windowIndex = Object.entries(currentWindows).length + 1;
  for (const [id, meta] of Object.entries(currentWindows)){
    let index = currentWindows[id].windowIndex;
    if (index > oldIndex){
      currentWindows[id].windowIndex -= 1;
      index -= 1;
    }
    currentWindows[id].focused = id === windowId;
    currentWindows[id].zIndex = 100 + index;
  }
  windowStore.set(currentWindows);
}