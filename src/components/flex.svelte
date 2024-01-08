<script lang="ts">
	import type { CrossAxis, FlexDirection, MainAxis, Optional } from "@/lib/types";

  export let mainAxis: Optional<MainAxis> = undefined;
  export let crossAxis: Optional<CrossAxis> = undefined;
  export let direction: Optional<FlexDirection> = undefined;
  export let gap: Optional<string> = undefined;

  let classes = "";
  let style = "";

  if (gap){
    style = `gap: ${gap};`;
  }

  if (mainAxis){
    classes += ` ma-${mainAxis}`;
  }
  
  if (crossAxis){
    classes += ` ca-${crossAxis}`;
  }

  if (direction){
    classes += ` fd-${direction}`
  }
</script>

<div style={style} class={classes}>
  <slot/>
</div>

<style>
  div{
    display: flex;
    width: fit-content;
    height: fit-content;
  }

  .ma-start{
    justify-content: flex-start;
  }

  .ma-end{
    justify-content: flex-end;
  }

  .ma-center{
    justify-content: center;
  }

  .ma-evenly{
    justify-content: space-evenly;
  }

  .ma-around{
    justify-content: space-around;
  }

  .ma-between{
    justify-content: space-between;
  }

  .ca-start{
    align-items: flex-start;
  }

  .ca-end{
    align-items: flex-end;
  }

  .ca-stretch{
    align-items: stretch;
  }

  .ca-center{
    align-items: center;
  }

  .fd-row{
    flex-direction: row;
  }

  .fd-column{
    flex-direction: column;
  }

  .fd-row-rev{
    flex-direction: row-reverse;
  }

  .fd-column-rev{
    flex-direction: column-reverse;
  }
</style>