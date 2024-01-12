<script lang="ts">
	import { windowStore, type EmptyWindow, type WindowMeta, type WindowPayloadTypes, updateWindow, closeWindow } from "@/lib/window";
  import Window from "./window.svelte";

  let currentWindows: {[key: string]: WindowMeta<WindowPayloadTypes>} = {};
  windowStore.subscribe(value => { currentWindows = value });

  let demoMeta: WindowMeta<EmptyWindow> = {
    windowIndex: -1,
    windowId: "demo-window",
    windowType: "empty",
    data: {},
    title: "測試",
    x: 500,
    y: 500,
    width: 600,
    height: 200,
    zIndex: 10,
    focused: false
  };

  function test(){
    demoMeta.x += 20;
    demoMeta.y += 20;
    demoMeta.windowId += "a";
    updateWindow({...demoMeta});
  }

  function close(){
    closeWindow(demoMeta.windowId);
  }
</script>

{#each Object.entries(currentWindows) as [id, meta]}
<Window meta={meta}/>
{/each}