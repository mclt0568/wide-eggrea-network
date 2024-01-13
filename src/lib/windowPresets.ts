import type { BlogPostMeta } from "./blogPost";
import type { EmptyWindow, ViewBlogWindow, WindowMeta } from "./window";

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

export let getViewBlogPreset: (blogMeta: BlogPostMeta) => WindowMeta<ViewBlogWindow> = (blogMeta) => {
  return {
    windowId: `view-blog-${blogMeta.blogId}`,
    windowIndex: -1,
    windowType: "view-blog",
    data: {meta: blogMeta},
    title: `「${blogMeta.title}」的貼文內容`,
    x: 150,
    y: 100,
    width: 800,
    height: 750,
    zIndex: -1,
    focused: false,
  }
}