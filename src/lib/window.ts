import { writable, type Writable } from "svelte/store";

export type WindowMeta<T> = {
  windowId: string;
  windowType: string;
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

export type WindowTypes = EmptyWindow;

let currentWindows: {[key: string]: WindowMeta<WindowTypes>} = {};
export let windowStore: Writable<{[key: string]: WindowMeta<WindowTypes>}> = writable(currentWindows);
windowStore.subscribe(value => {currentWindows = value});

export function updateWindow(newMeta: WindowMeta<WindowTypes>){
  currentWindows[newMeta.windowId] = newMeta;
  windowStore.set(currentWindows);
}

export function closeWindow(windowId: string){
  delete currentWindows[windowId];
  windowStore.set(currentWindows);
}

export function focusWindow(windowId: string){
  let count = 0;
  for (const [id, meta] of Object.entries(currentWindows)){
    count += 1;
    if (id === windowId){
      currentWindows[id].focused = true;
      currentWindows[id].zIndex = 110 + count;
    }
    else {
      currentWindows[id].focused = false;
      currentWindows[id].zIndex = 100 + count - Object.entries(currentWindows).length;
    }
  }
  windowStore.set(currentWindows);
}