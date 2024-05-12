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
  matches: ["https://saas.jishiyuchat.com/*","https://www.baidu.com/* "],
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
          id: 123
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
  <el-button class="abc" @click="refresh">刷新</el-button>
</template>
