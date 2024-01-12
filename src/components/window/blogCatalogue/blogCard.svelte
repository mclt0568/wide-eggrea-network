<script lang="ts">
	import Box from "@/components/box.svelte";
	import Container from "@/components/container.svelte";
	import Flex from "@/components/flex.svelte";
  import { categoryNameLookup, type BlogPostMeta } from "@/lib/blogPost";
	import { Cafe, Catalog, Folder, Settings } from "carbon-icons-svelte";

  export let meta: BlogPostMeta;
</script>

<div class="blog">
  <!-- {#if meta.cover} -->
  <img src="https://cdn.discordapp.com/attachments/948527382774571039/1195230804620611644/Image.png"/>
  <!-- {/if} -->
  <div class="blog-info">
    <Box padding="6px 20px 10px 20px">
      <h2>{meta.title}</h2>
      <Box margin="10px 0px">
        <h3>{meta.description}</h3>
      </Box>
      <Container size="match-all">
        <Flex mainAxis="between" crossAxis="center">
          <Flex gap="10px" crossAxis="center">
            {#if meta.category === "journal"}
            <Catalog size={20} />
            {:else if meta.category === "life-backup"}
            <Folder size={20} />
            {:else if meta.category === "talk"}
            <Cafe size={20} />
            {:else}
            <Settings size={20} />
            {/if}
            <span>{categoryNameLookup[meta.category]}</span>
          </Flex>
          <div>
            {meta.date[0]}年{meta.date[1]}月{meta.date[2]}日
          </div>
          <div class="blogId">
            {meta.blogId}
          </div>
        </Flex>
      </Container>
    </Box>
  </div>
</div>

<style>
  .blog {
    background: var(--window-panel-background);
    user-select: none;
  }
  
  .blog:hover {
    background: var(--blog-catalogue-focus);
  }
  
  .blog > img{
    height: 250px;
    width: 100%;
    object-fit: cover;
  }

  .blog > * {
    color: var(--foreground-default);
  }

  h2, h3 {
    margin: 0;
    user-select: all;
  }

  h2 {
    font-size: 24px;
    font-weight: 300;
  }
  
  h3 {
    font-size: 16px;
    font-weight: normal;
  }
  
  .blogId{
    font-family: 'IBM Plex Mono', monospace;
    user-select: all;
  }
</style>