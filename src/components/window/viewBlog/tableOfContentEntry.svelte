<script lang="ts">
	import type Color from "color";
  import Flex from "@/components/flex.svelte";
  import Box from "@/components/box.svelte";
	import { CaretRight } from "carbon-icons-svelte";
	import { styleStore } from "@/lib/theme";
	import { createEventDispatcher } from "svelte";

  export let text: string;
  export let color: Color;
  export let selected: boolean = false;

  let style: {[key: string]: string} = {};
  styleStore.subscribe(value => {style = value;});

  const dispatcher = createEventDispatcher();
  const dispatch = () => dispatcher("click");
</script>

<div class="entry" on:click={dispatch}>
  <Box padding="5px">
    <Flex>
      <div class="space"></div>
      <Flex gap="10px" crossAxis="end">
        <CaretRight color={selected ? color.hex() : style["--default-foreground"]} size={20} />
        <span style={`
          color: ${selected ? color.hex() : "var(--default-foreground)"}
        `}>{text}</span>
      </Flex>
    </Flex>
  </Box>
</div>

<style>
.entry {
  overflow-x: hidden;
}

.entry:hover {
  background: var(--window-panel-background);
}

.space{
  transition: width cubic-bezier(1, 0, 0, 1) 0.1s;
  height: 1px;
  width: 0px;
}

.entry:hover .space {
  width: 7px;
}

span {
  color: var(--default-foreground);
  user-select: none;
}
</style>