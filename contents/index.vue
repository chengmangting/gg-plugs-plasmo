<script lang="ts">
import cssText from "data-text:~/contents/index.css"
import { ElButton } from "element-plus"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
  PlasmoMountShadowHost
} from "plasmo"

import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["https://saas.jishiyuchat.com/*"],
  css: ["resetOrigin.css"],
}
const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText.replaceAll(":root", ":host(plasmo-csui)")
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
      
    }
  },
  components: { ElButton },
  plasmo: {
    mountShadowHost,
    getInlineAnchor,
    getStyle
  },
  setup() {
    async function refresh() {
      await sendToBackground({
        body: {
          type: "getToken"
        },
        name: "reFreshToken"
      })
    }
    return {
      refresh
    }
  },
  mounted() {}
}
</script>

<template>
  <div>
    
  </div>
</template>
 