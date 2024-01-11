<script lang="ts">
	import { closeWindow, focusWindow, updateWindow, type WindowMeta, type WindowTypes } from "@/lib/window";
	import Container from "./container.svelte";
	import Flex from "./flex.svelte";
	import Box from "./box.svelte";
	import { Close } from "carbon-icons-svelte";
	import Center from "./center.svelte";

  export let meta: WindowMeta<WindowTypes>;

  // FOCUS HANDLERS
  function setFocus(){
    focusWindow(meta.windowId);
  }

  // CLOSE HANDLERS
  function close(){
    closeWindow(meta.windowId);
  }

  // DRAG HANDLERS
  let titleDragState = false;
  let currentPosition: [number, number] = [0, 0];
  function startTitleDrag(e: MouseEvent){
    titleDragState = true;
    currentPosition = [e.pageX, e.pageY];
  }
  function endTitleDrag(){
    titleDragState = false;
  }
  function titleDragHandler(e: MouseEvent){
    if (titleDragState){
      let deltaX = e.pageX - currentPosition[0];
      let deltaY = e.pageY - currentPosition[1];

      if (meta.x + deltaX + meta.width > window.innerWidth){
        deltaX = 0;
      }
      
      if (meta.y + deltaY + meta.height > window.innerHeight){
        deltaY = 0;
      }

      const newMeta = {
        ...meta,
        x: meta.x + deltaX,
        y: meta.y + deltaY
      };
      updateWindow(newMeta);
      currentPosition = [e.pageX, e.pageY];
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class={"drag-region " + (meta.focused ? "focused " : "") + (titleDragState ? "dragging" : "")}
  style={`
    padding-left: ${meta.x}px;
    padding-top: ${meta.y}px;
    padding-right: calc(100vw - ${meta.x + meta.width}px);
    padding-bottom: calc(100vh - ${meta.y + meta.height}px);
    pointer-events: ${titleDragState ? "all" : "none"};
    z-index: ${meta.zIndex};
  `}
  on:mouseup={endTitleDrag}
  on:mousemove={titleDragHandler}
  >
  <div 
  class={"window " + (meta.focused ? "focused " : "") + (titleDragState ? "dragging" : "")}
  id={`window-${meta.windowId}`}
  style={`
      width: ${meta.width}px;
      height: ${meta.height}px;
    `}
    on:mousedown={setFocus}
    on:mouseup={endTitleDrag}
  >
    <div class="title-bar">
      <Container size="match-all">
        <Flex crossAxis="center">
          <Container size="match-all">
            <div on:mousedown={startTitleDrag}>
              <Box
                padding="11px 20px" flex="1">
                <h2 class="title">{meta.title}</h2>
              </Box>
            </div>
          </Container>
          <div class="close-control"
            on:click={close}
          >
            <Box padding="7px">
              <Center>
                <Close size={32} />
              </Center>
            </Box>
          </div>
        </Flex>
      </Container>
    </div>
    <div class="content">
    </div>
  </div>
</div>

<style>
  .window{
    backdrop-filter: var(--window-backdrop);
    background: var(--window-background);
    pointer-events: all;
  }
  
  .window.focused{
    backdrop-filter: var(--window-backdrop-focused);
    background: var(--window-background-focused);
  }

  .drag-region{
    transition: background cubic-bezier(1, 0, 0, 1) 0.2s;
    top: 0;
    left: 0;
    position: absolute;
  }

  .drag-region.dragging{
    background: rgba(0,0,0,0.2);
  }

  .title-bar{
    height: 46px;
    user-select: none;
    cursor: grab;
  }

  .title-bar h2 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  .close-control{
    cursor: default;
    transition: background cubic-bezier(1, 0, 0, 1) 0.1s;
  }

  .close-control:hover{
    background: var(--hover);
  }
</style>

