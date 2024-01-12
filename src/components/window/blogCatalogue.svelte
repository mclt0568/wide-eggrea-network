<script lang="ts">
	import type { EmptyWindow, WindowMeta } from "@/lib/window";
	import Box from "../box.svelte";
	import Container from "../container.svelte";
	import Flex from "../flex.svelte";
	import FilterToggle from "./blogCatalogue/filterToggle.svelte";
	import { Cafe, Catalog, Folder } from "carbon-icons-svelte";
	import { styleStore } from "@/lib/theme";
	import type { BlogPostMeta } from "@/lib/blogPost";
	import Color from "color";
	import BlogCard from "./blogCatalogue/blogCard.svelte";

  export let meta: WindowMeta<EmptyWindow>;

  let style: {[key: string]: string} = {};
  styleStore.subscribe(value => { style = value; });

  let selected = "all";

  const switchToggled = (name: string) => () => { 
    if (selected === name){
      return;
    }

    selected = name;
  };

  let demoBlog: BlogPostMeta = {
    blogId: "ABCDEF",
    title: "義大利麵拌混泥土",
    description: "我個人認為義大利麵就應該拌42號混泥土，因為這個螺絲釘的長度很容易直接影響到挖掘機的扭矩。",
    category: "talk",
    tags: [],
    date: [2023, 10, 1],
    color: Color("#353562"),
    attachments: [],
    cover: null,
  };
</script>

<Box padding="0 20px 20px 20px">
  <Container size="match-all">
    <Flex crossAxis="stretch">
      <div class="left">
        <Box padding="0 20px 0 0">
          <div class="sidebar">
            <Container size="match-all">
              <Flex gap="15px" direction="column" crossAxis="stretch">
                <FilterToggle on:click={switchToggled("all")} selected={selected==="all"} text="所有內容" />
                <FilterToggle on:click={switchToggled("journal")} selected={selected==="journal"} text="日常日誌">
                  <Catalog color={selected==="journal" ? style["--default-foreground-invert"] : style["--default-foreground"]} slot="icon"/>
                </FilterToggle>
                <FilterToggle on:click={switchToggled("talk")} selected={selected==="talk"} text="閒聊雜談">
                  <Cafe color={selected==="talk" ? style["--default-foreground-invert"] : style["--default-foreground"]} slot="icon"/>
                </FilterToggle>
                <FilterToggle on:click={switchToggled("life-backup")} selected={selected==="life-backup"} text="人生備份">
                  <Folder color={selected==="life-backup" ? style["--default-foreground-invert"] : style["--default-foreground"]} slot="icon"/>
                </FilterToggle>
              </Flex>
            </Container>
          </div>
        </Box>
      </div>
      <Box flex="1">
        <div
          class="right"
          style={`
            max-height: ${meta.height - 66}px;
          `}
        >
          <BlogCard meta={demoBlog}/>
        </div>
      </Box>
    </Flex>
  </Container>
</Box>

<style>
  .left {
    width: 270px;
  }

  .right {
    overflow-y: auto;
  }
</style>