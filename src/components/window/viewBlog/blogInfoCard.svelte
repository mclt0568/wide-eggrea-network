<script lang="ts">
	import Box from "@/components/box.svelte";
  import Flex from "@/components/flex.svelte";
	import { categoryNameLookup, type BlogPostMeta } from "@/lib/blogPost";
	import { storage } from "@/lib/database";
	import { computeLightForeground } from "@/lib/theme";
	import { Cafe, Catalog, Folder, Settings, Calendar, Compass } from "carbon-icons-svelte";
	import { ref, getDownloadURL } from "firebase/storage";

  export let meta: BlogPostMeta;
  let coverURL = "";
  if (meta.cover){
    let coverRef = ref(storage, `blog/${meta.blogId}/${meta.cover}`);
    getDownloadURL(coverRef).then(url => {coverURL = url;});
  }

  function getDate(date: [number, number, number]){
    return `${date[0]}年${date[1]}月${date[2]}日`;
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div style={`
    background: ${meta.color.hex()};
    --foreground-computed: ${computeLightForeground(meta.color).hex()};
  `} class="info-card">
  {#if meta.cover}
  <img src={coverURL}/>
  {/if}
  <Box padding={meta.cover ? "10px 20px 18px 20px" : "18px 20px"}>
    <Box margin="0 0 15px 0">
      <h2>{meta.title}</h2>
    </Box>
    <Box margin="0 0 15px 0">
      <span class="computed-foreground">{meta.description}</span>
    </Box>
    <Flex direction="column" gap="4px">
      <Flex gap="10px" crossAxis="end">
        {#if meta.category === "journal"}
        <Catalog color={computeLightForeground(meta.color).hex()} size={20} />
        {:else if meta.category === "life-backup"}
        <Folder color={computeLightForeground(meta.color).hex()} size={20} />
        {:else if meta.category === "talk"}
        <Cafe color={computeLightForeground(meta.color).hex()} size={20} />
        {:else}
        <Settings color={computeLightForeground(meta.color).hex()} size={20} />
        {/if}
        <span class="computed-foreground">{categoryNameLookup[meta.category]}</span>
      </Flex>
      <Flex gap="10px" crossAxis="end">
        <Calendar size={20} color={computeLightForeground(meta.color).hex()} />
        <span class="computed-foreground">{getDate(meta.date)}</span>
      </Flex>
      <Flex gap="10px" crossAxis="end">
        <Compass size={20} color={computeLightForeground(meta.color).hex()} />
        <span class="computed-foreground monospace">{meta.blogId}</span>
      </Flex>
    </Flex>
  </Box>
</div>

<style>
  .info-card {
    color: var(--default-foreground-invert);
  }
  
  img {
    object-fit: cover;
    width: 240px;
    height: 150px;
  }

  .info-card * {
    font-size: 16px;
  }

  h2 {
    margin: 0;
    font-weight: 500;
  }

  .computed-foreground {
    color: var(--foreground-computed);
  }

  .monospace{
    font-family: "IBM Plex Mono", monospace;
  }
</style>