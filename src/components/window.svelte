<script lang="ts">
	import { focusWindow, updateWindow, type WindowMeta, type WindowTypes } from "@/lib/window";
	import Container from "./container.svelte";
	import Flex from "./flex.svelte";
	import Box from "./box.svelte";
	import { Close } from "carbon-icons-svelte";
	import { createEventDispatcher } from "svelte";

  export let meta: WindowMeta<WindowTypes>;

  // FOCUS HANDLERS
  function setFocus(){
    focusWindow(meta.windowId);
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
      const deltaX = e.pageX - currentPosition[0];
      const deltaY = e.pageY - currentPosition[1];
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
  class={"drag-region " + (titleDragState ? "focused" : "")}
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
  class={"window " + (titleDragState ? "focused" : "")}
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
          <Box padding="7px">
            <Close size={32} />
          </Box>
        </Flex>
      </Container>
    </div>
    <div class="content">
      {titleDragState}
      {meta.focused}
      {meta.zIndex}
    </div>
  </div>
</div>

<style>
  .window{
    backdrop-filter: blur(5px);
    background: rgba(255,255,255,0.5);
    pointer-events: all;
  }

  .drag-region{
    transition: background cubic-bezier(1, 0, 0, 1) 0.2s;
    top: 0;
    left: 0;
    position: absolute;
  }

  .drag-region.focused{
    background: rgba(0,0,0,0.5);
  }

  .title-bar{
    height: 46px;
    user-select: none;
  }

  .title-bar h2 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }
</style>

