<script lang="ts">
	import type { Optional } from "@/lib/types";

  export let padding: Optional<string> = undefined;
  export let margin: Optional<string> = undefined;
  export let border: Optional<string> = undefined;
  export let radius: Optional<string> = undefined;
  export let flex: Optional<string> = undefined;

  let style = "";

  if (padding){
    style = `padding: ${padding};`;
  }

  if (margin){
    style += ` margin: ${margin};`;
  }

  if (border){
    style += ` border: ${border};`;
  }

  if (radius){
    style += ` border-radius: ${radius};`;
  }

  if (flex){
    style += ` flex: ${flex};`;
  }
</script>

<div style={style}>
  <slot/>
</div>