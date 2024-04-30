<script lang="ts">
import cssText from "data-text:~/contents/index.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
  PlasmoMountShadowHost
} from "plasmo"

import "element-plus"

export const config: PlasmoCSConfig = {
  matches: ["https://saas.jishiyuchat.com/*"],
  css: ["resetOrigin.css"]
}
const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.getElementById("app")

const mountShadowHost: PlasmoMountShadowHost = ({ anchor, shadowHost }) => {
  anchor!.element!.appendChild(shadowHost)
}

export default {
  data() {
    return {
      count: 123456
    }
  },
  plasmo: {
    mountShadowHost,
    getInlineAnchor,
    getStyle
  },
  setup() {},
  mounted() {}
}
</script>

<template>
  <div class="abc"></div>
</template>
