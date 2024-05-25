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

import storage from "~util/storage"

import mainPage from "./component/mainPage.vue"
import refreshPage from "./component/refreshPage.vue"

export const config: PlasmoCSConfig = {
  matches: ["https://saas.jishiyuchat.com/*"],
  css: ["resetOrigin.css"]
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
      step: 1 // 1：刷新页；2：内容页
    }
  },
  components: { ElButton, mainPage, refreshPage },
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
  mounted() {
    storage.watch({
      tokens: (c) => {
        console.log("tokenchange", c)
        this.step = c.newValue ? 2 : 1
      }
    })
  }
}
</script>

<template>
  <div class="flex items-center">
    <!-- 展开/收起图标 -->
    <img src="~" />
    <!-- 刷新页面 -->
    <refreshPage v-if="step===1" />
    <!-- 内容页 -->
    <mainPage v-if="step===2" />
  </div>
</template>
