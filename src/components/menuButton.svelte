<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Box from "./box.svelte";
	import Container from "./container.svelte";
	import Flex from "./flex.svelte";
  import CaretRight from "carbon-icons-svelte/lib/CaretRight.svelte";
	import { styleStore, themeToRawStyle } from "@/lib/theme";
  import defaultLight from "@/assets/themes/default-light.json";
  
  export let text: string = "";

  const dispatch = createEventDispatcher();

  let style = defaultLight;
  styleStore.subscribe((newStyle) => {
    style = newStyle;
  });

  let foreground = style["--default-foreground"];
</script>

<div>
  <Container size="match-width">
  <button on:click={(event)=>{dispatch("click", event)}}>
      <Box padding="12px 25px 12px 0px">
        <Flex direction="row" crossAxis="end" mainAxis="start" gap="20px">
          <div class="space"></div>
          <CaretRight color={foreground} size={20} />
          <span>{text}</span>
        </Flex>
      </Box>
    </button>
  </Container>
</div>

<style>
  button{
    border: none;
    padding: none;
    background: none;
    cursor: url(@/assets/open.svg);
  }

  button:hover{
    background: var(--hover);
  }

  span{
    font-size: 16px;
  }

  .space{
    transition: width cubic-bezier(1, 0, 0, 1) 0.1s;
    width: 0px;
    height: 10px;
  }

  button:hover .space{
    width: 10px;
  }

  span{
    color: var(--default-foreground);
  }
</style>