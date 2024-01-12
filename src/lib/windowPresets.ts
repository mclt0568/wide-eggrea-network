import type { EmptyWindow, WindowMeta } from "./window";

export let blogCatalogue: WindowMeta<EmptyWindow> = {
  windowId: "view-catalogue",
  windowIndex: -1,
  windowType: "blog-catalogue",
  data: {},
  title: "部落格",
  x: 100,
  y: 50,
  width: 950,
  height: 750,
  zIndex: -1,
  focused: false,
};