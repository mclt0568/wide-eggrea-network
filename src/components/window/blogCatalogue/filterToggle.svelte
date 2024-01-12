<script lang="ts">
	import Box from "@/components/box.svelte";
	import Container from "@/components/container.svelte";
	import Flex from "@/components/flex.svelte";
	import { createEventDispatcher } from "svelte";

  export let selected: boolean = false;
  export let text: string = "";

  let dispatcher = createEventDispatcher()
  function dispatchEvent(){
    dispatcher("click");
  }
</script>

<button on:click={dispatchEvent} class={selected ? "selected" : ""}>
  <Box padding="18px 20px">
    <Container size="match-all">
      <Flex gap="10px" crossAxis="center">
        <slot name="icon" />
        <span>{text}</span>
      </Flex>
    </Container>
  </Box>
</button>

<style>
  button{
    border: 0;
    background: var(--window-panel-background);
  }

  button.selected {
    background: var(--blog-catalogue-accent)
  }
  
  button:hover{
    background: var(--blog-catalogue-focus);
  }
  
  button.selected:hover{
    background: var(--blog-catalogue-accent-focus);
  }

  span {
    font-size: 16px;
    color: var(--default-foreground);
  }
  
  button.selected span {
    color: var(--default-foreground-invert);
  }
</style>