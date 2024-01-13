<script lang="ts">
	import type Color from "color";

  export let size: number = 20;
  export let color: Color;
</script>

<svg width={size.toString()} height={size.toString()} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3156 4.7577C18.411 6.28625 19 8.11951 19 10H16C16 8.74634 15.6073 7.52417 14.8771 6.50513C14.1469 5.4861 13.1158 4.7214 11.9286 4.31842C10.7415 3.91544 9.45797 3.89444 8.25829 4.25836C7.05862 4.62228 6.00306 5.35284 5.23988 6.34743C4.4767 7.34203 4.04423 8.5507 4.00321 9.80369C3.9622 11.0567 4.31469 12.291 5.01118 13.3334C5.70768 14.3758 6.71319 15.1738 7.8865 15.6154C9.05981 16.057 10.342 16.12 11.5529 15.7956L12.3294 18.6933C10.513 19.18 8.58971 19.0856 6.82975 18.4232C5.06979 17.7607 3.56152 16.5637 2.51678 15.0001C1.47203 13.4366 0.943293 11.585 1.00482 9.70553C1.06635 7.82604 1.71505 6.01304 2.85982 4.52115C4.00459 3.02925 5.58792 1.93341 7.38744 1.38754C9.18696 0.841659 11.1123 0.873165 12.893 1.47763C14.6737 2.08209 16.2203 3.22915 17.3156 4.7577Z"
  fill={color.hex()}/>
</svg>

<style>
  svg {
    animation: spin 1.5s linear infinite;
    -webkit-animation: spin 1.5s linear infinite;
  }

  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>