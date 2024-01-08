<script lang="ts">
	import type { MatchMode } from "@/lib/types";

  export let size: MatchMode = "match-none";

  let classes = "";

  const conventionSizes: MatchMode[] = ["match-none", "match-width", "match-height", "match-all"];

  if (conventionSizes.includes(size)) {
    classes += ` size-${size}`
  }
</script>

<div class={classes}>
  <slot/>
</div>

<style>
  div:global(.size-match-none>*),
  .size-match-none{
    width: fit-content;
    height: fit-content;
  }
  
  div:global(.size-match-all>*),
  .size-match-all{
    width: 100%;
    height: 100%;
  }
  
  div:global(.size-match-width>*),
  .size-match-width{
    width: 100%;
    height: fit-content;
  }
  
  div:global(.size-match-height>*),
  .size-match-height{
    width: fit-content;
    height: 100%;
  }
</style>