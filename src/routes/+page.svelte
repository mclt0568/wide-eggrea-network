<script>
	import Box from "@/components/box.svelte";
	import Container from "@/components/container.svelte";
	import Flex from "@/components/flex.svelte";
	import { styleStore, themeToRawStyle } from "@/lib/theme";
  import logo from "@/assets/logo.svg";
	import MenuButton from "@/components/menuButton.svelte";
  import defaultLight from "@/assets/themes/default-light.json";
  import { CollapsibleCard } from 'svelte-collapsible'

  let infoStatus = false;
  function infoMouseEnter(){
    infoStatus = true;
  }
  function infoMouseExit(){
    infoStatus = false;
  }
  
  let style = themeToRawStyle(defaultLight);
  styleStore.subscribe((newStyle) => {
    style = themeToRawStyle(newStyle);
  });
</script>

<div style={style} class="page">
  <Container size="match-all">
    <Flex crossAxis="stretch">
      <div class="menu">
        <Box padding="60px">
          <Container size="match-all">
            <Flex direction="column" gap="32px">
              <img src={logo}/>
              <div>
                <MenuButton text="查看我的部落格"/>
                <MenuButton text="關於我與網際煎蛋網路"/>
                <MenuButton text="其他社群、與我聯繫"/>
              </div>
            </Flex>
          </Container>
        </Box>
      </div>
      <Box flex="1">
        <div class="showcase" 
          on:mouseenter={infoMouseEnter}
          on:mouseleave={infoMouseExit}>
          <CollapsibleCard open={infoStatus} duration={0.2} easing="cubic-bezier(1, 0, 0, 1)">
            <div slot="header" class="info">
              <Box padding="8px 100px 0px 12px">
                <h3>大阪市區某建築</h3>
              </Box>
              <Box padding="0px 16px 8px 12px">
                <div class="info-description">拍攝於 2020年1月</div>
              </Box>
            </div>
            <div class="info-description" slot="body">
              <Box padding="0px 16px 8px 16px">
                <div class="info-description">一月下午陽光明媚，混凝土與玻璃是大阪現代化都市風貌的基色。</div>
              </Box>
            </div>
          </CollapsibleCard>
        </div>
      </Box>
    </Flex>
  </Container>
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
    background-image: url(@/assets/images/1.png);
    background-size: cover;
    height: 100vh;
  }
  
  .menu{
    width: 60vw;
    max-width: 600px;
    background: var(--main-menu-background);
  }

  .showcase{
    position: absolute;
    background: var(--infobox);
    max-width: 300px;
    right: 50px;
    bottom: 50px;
  }

  @media only screen and (max-width: 600px) {
    .menu {
      max-width: 100vw;
      width: 100vw;
    }
    .showcase{
      display: none;
    }
  }

  .info{
    color: var(--infobox-foreground)
  }

  .info h3{
    margin: 0;
    font-size: 24px;
    font-weight: 300;
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