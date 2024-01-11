<script lang="ts">
	import Box from "@/components/box.svelte";
	import Container from "@/components/container.svelte";
	import Flex from "@/components/flex.svelte";
	import { styleStore, themeToRawStyle } from "@/lib/theme";
  import logo from "@/assets/logo.svg";
	import MenuButton from "@/components/menuButton.svelte";
  import defaultLight from "@/assets/themes/default-light.json";
  import { CollapsibleCard } from 'svelte-collapsible'
	import { coverpageStore, type CoverData } from "@/lib/cover";
	import type { Optional } from "@/lib/types";
	import { getDownloadURL, ref } from "firebase/storage";
	import { storage } from "@/lib/database";
	import WindowManager from "@/components/windowManager.svelte";


  
  let coverData: Optional<CoverData> = undefined;
  let coverURL: string = "";
  coverpageStore.subscribe((cover)=>{
    const index = Math.floor(Math.random()*cover.length);
    coverData = cover[index];
    const imageRef = ref(storage, `cover/${index}.png`);
    getDownloadURL(imageRef).then((url)=>{
      coverURL = url;
      style = `--cover-url: url(${coverURL});` + themeToRawStyle(defaultLight);
    })
  });

  let style = `--cover-url: url(${coverURL});` + themeToRawStyle(defaultLight);
  styleStore.subscribe((newStyle) => {
    style = `--cover-url: url(${coverURL});` + themeToRawStyle(newStyle);
  });

  let infoStatus = false;
  function infoMouseEnter(){
    infoStatus = true;
  }
  function infoMouseExit(){
    infoStatus = false;
  }
</script>

<div style={style} class="page">
  <Box padding="30px">
    <Flex direction="column" gap="10px">
      <img src={logo} alt="Wide Eggrea Network Logo"/>
      <div class="menu">
        <Box padding="5px">
          <MenuButton text="查看我的部落格"/>
          <MenuButton text="關於我與網際煎蛋網路"/>
          <MenuButton text="其他社群、與我聯繫"/>
        </Box>
      </div>
    </Flex>
  </Box>
  <Box>
    {#if coverData}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="showcase" 
        on:mouseenter={infoMouseEnter}
        on:mouseleave={infoMouseExit}>
        <CollapsibleCard open={infoStatus} duration={0.2} easing="cubic-bezier(1, 0, 0, 1)">
          <div slot="header" class="info">
            <Box padding="8px 50px 0px 12px">
              <h3>{coverData.title}</h3>
            </Box>
            <Box padding="0px 16px 16px 12px">
              <div class="info-description">拍攝於 {coverData.date}</div>
            </Box>
          </div>
          <div class="info-description" slot="body">
            <Box padding="0px 16px 12px 16px">
              <div class="info-description">{coverData.description}</div>
            </Box>
            <Box padding="0px 16px 16px 16px">
              <div class="info-description">{coverData.copyright}</div>
            </Box>
          </div>
        </CollapsibleCard>
      </div>
    {/if}
  </Box>
  <WindowManager />
</div>

<style>
  :global(*){
    font-family: var(--font);
  }
  
  :global(body){
    margin: 0;
    padding: 0;
  }
  
  .page {
    background-image: var(--cover-url);
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
  
  .menu{
    width: 60vw;
    max-width: 450px;
    min-width: 350px;
    background: var(--main-menu-background);
    backdrop-filter: blur(3px);
  }
  
  .menu:hover{
    background: var(--main-menu-background-hover);
  }

  .showcase{
    position: absolute;
    background: var(--infobox);
    max-width: 350px;
    right: 50px;
    bottom: 50px;
  }

  .info{
    color: var(--infobox-foreground)
  }

  .info h3{
    margin: 0;
    font-size: 24px;
    font-weight: 300;
    text-align: left;
  }

  .info-description{
    color: var(--infobox-foreground);
    text-align: left;
    font-size: 16px;
  }

  img{
    width: 282px;
  }
</style>