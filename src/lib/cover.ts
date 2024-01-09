import { onValue } from "firebase/database";
import { writable, type Writable } from "svelte/store";
import { coverRef } from "./database";

export type CoverData = {
  id: number,
  title: string,
  date: string,
  description: string,
  copyright: string
};

export const coverpageStore: Writable<CoverData[]> = writable([]);

onValue(coverRef, (snapshot)=>{
  const data = snapshot.val();
  let cover: CoverData[] = [];
  
  data.forEach((element: {
      copyright: string,
      date: string,
      description: string,
      title: string
    }, index: number) => {
    const copyright: string = element.copyright;
    const date: string = element.date;
    const description: string = element.description;
    const title: string = element.title;
    cover.push({copyright, date, description, title, id: index})
  });

  coverpageStore.set(cover);
})