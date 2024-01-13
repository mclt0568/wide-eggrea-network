<script lang="ts">
  import Box from "@/components/box.svelte";
  import Flex from "@/components/flex.svelte";
  import Loading from "@/components/loading.svelte";
	import { Attachment } from "carbon-icons-svelte";
	import { styleStore } from "@/lib/theme";
	import { storage } from "@/lib/database";
  import { ref, getDownloadURL } from "firebase/storage";
	import fileDownload from "js-file-download";
	import Color from "color";

  export let filename: string;
  export let blogId: string;
  export let color: Color;

  let style: {[key: string]: string} = {};
  styleStore.subscribe(value => {style = value;});
  let loading = false;

  async function download(){
    loading = true;
    const coverRef = ref(storage, `blog/${blogId}/${filename}`);
    const file = await getDownloadURL(coverRef);
    fileDownload(await (await fetch(file)).blob(), filename);
    loading = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={download}
  class="attachment">
  <Box padding="5px">
    <Flex gap="10px" crossAxis={loading ? "center" : "end"}>
      {#if loading}
      <Loading color={color}/>
      {:else}
      <Attachment color={style["--default-foreground"]} size={20} />
      {/if}
      <span>{filename}</span>
    </Flex>
  </Box>
</div>

<style>
.attachment {
  overflow-x: hidden;
}

.attachment:hover {
  background: var(--window-panel-background);
}

span {
  color: var(--default-foreground);
  user-select: none;
}
</style>