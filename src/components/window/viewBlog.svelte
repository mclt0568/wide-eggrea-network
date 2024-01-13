<script lang="ts">
	import type { ViewBlogWindow, WindowMeta, WindowPayloadTypes } from "@/lib/window";
	import Box from "@/components/box.svelte";
	import Container from "@/components/container.svelte";
	import Flex from "@/components/flex.svelte";
	import Loading from "@/components/loading.svelte";
	import Center from "@/components/center.svelte";
	import BlogInfoCard from "@/components/window/viewBlog/blogInfoCard.svelte";
	import TableOfContentEntry from "@/components/window/viewBlog/tableOfContentEntry.svelte";
	import Attachment from "@/components/window/viewBlog/attachment.svelte";
	import { getPostContent } from "@/lib/blogPost";
	import SvelteMarkdown from "svelte-markdown";

  export let meta: WindowMeta<WindowPayloadTypes>;
  const metaCast = meta as WindowMeta<ViewBlogWindow>;
  const blog = metaCast.data.meta;

  let blogContent = "";
  getPostContent(blog.blogId).then(value => {blogContent = value;});

  let currentViewing = 0;
  function firstHeaderVisible(){
    const container = document.querySelector(`#view-blog-markdown-${blog.blogId}`);
    if (container){
      const topBorder = meta.y + 46;
      const children = container.childNodes as NodeListOf<Element>;
      const headers = Array.from(children).filter(node => node.tagName === "H2");
      const boundingRect = headers.map(element => element.getBoundingClientRect().top > topBorder);
      currentViewing = boundingRect.indexOf(true);
    }
  }

  const scrollToView = (index: number) => () => {
    const container = document.querySelector(`#view-blog-markdown-${blog.blogId}`);
    const scrollContainer = document.querySelector(`.right:has(#view-blog-markdown-${blog.blogId})`) as Element;
    if (container){
      const topBorder = meta.y + 46;
      const children = container.childNodes as NodeListOf<Element>;
      const headers = Array.from(children).filter(node => node.tagName === "H2");
      const boundingRect = headers.map(element => element.getBoundingClientRect().top - topBorder);
      scrollContainer.scrollTo({
        top: scrollContainer.scrollTop + boundingRect[index] - 10,
        behavior: "smooth"
      });
    }
  };

  function getH2Headers(content: String){
    const pattern = /^##\s+(.+)$/gm;
    const matches = content.matchAll(pattern);
    let result: string[] = [];
    for (const match of matches){
      result.push(match[1]);
    }
    return result;
  }
</script>

<Box padding="0 20px 20px 20px">
  <Container size="match-all">
    <Flex crossAxis="stretch">
      <div class="left" style={`
        max-height: ${meta.height - 66}px;
      `}>
        <Box padding="0 20px 0 0">
          <div class="sidebar">
            <Container size="match-all">
              <Flex direction="column" gap="10px" crossAxis="stretch">
                  <BlogInfoCard meta={blog}/>
                  {#if getH2Headers(blogContent).length}
                  <div class="panel">
                    <Box padding="18px 20px">
                      <Container size="match-all">
                        <Flex gap="10px" direction="column">
                          <h3>目錄</h3>
                          {#each getH2Headers(blogContent).entries() as [index, header]}
                          <TableOfContentEntry 
                            on:click={scrollToView(index)} 
                            selected={currentViewing === index} 
                            text={header} 
                            color={blog.color} />
                          {/each}
                        </Flex>
                      </Container>
                    </Box>
                  </div>
                  {/if}
                  {#if blog.attachments.length}
                  <div class="panel">
                    <Box padding="18px 20px">
                      <Container size="match-all">
                        <Flex gap="10px" direction="column">
                          <h3>附加檔案</h3>
                          {#each blog.attachments as attachment}
                          <Attachment color={blog.color} blogId={blog.blogId} filename={attachment} />
                          {/each}
                        </Flex>
                      </Container>
                    </Box>
                  </div>
                  {/if}
              </Flex>
            </Container>
          </div>
        </Box>
      </div>
      <Box flex="1">
        <div
          class="right"
          style={`
            max-height: ${meta.height - 66}px;
          `}
          on:scroll={firstHeaderVisible}
        >
        <div style={`
          --blog-color: ${blog.color.hex()};
        `} class="global-markdown-content" id={`view-blog-markdown-${blog.blogId}`}>
          <h1>{blog.title}</h1>
          {#if blogContent === ""}
          <Center>
            <Loading color={blog.color} />
          </Center>
          {:else}
          <SvelteMarkdown source={blogContent} />
          {/if}
        </div>
        </div>
      </Box>
    </Flex>
  </Container>
</Box>

<style>
  .left {
    width: 260px;
    overflow-y: auto;
  }

  .right {
    overflow-y: auto;
  }

  .panel {
    background: var(--window-panel-background);
  }

  h3{
    font-weight: normal;
    font-size: 16px;
    margin: 0;
  }

  h1{
    margin: 0 0 17px 0;
    font-size: 40px;
    font-weight: 300;
    color: var(--blog-color);
  }

  :global(.global-markdown-content h2){
    margin: 0 0 17px 0;
    font-size: 24px;
    font-weight: 500;
    color: var(--blog-color);
  }

  :global(.global-markdown-content p){
    margin: 0 0 17px 0;
    font-size: 16px;
    color: var(--default-foreground);
  }

  :global(.global-markdown-content code){
    padding: 1px 5px;
    border-radius: 5px;
    background: var(--window-panel-background);
    font-family: "IBM Plex Mono", monospace;
    color: var(--default-foreground);
  }
</style>