<template>
  <div class="flex items-center h-screen">
    <!-- 展开/收起图标 -->
    <img
      v-if="!isShow"
      src="../assets/images/zjt.png"
      class="cursor-pointer w-7 basis-7"
      @click="changeShow" />
    <img
      v-if="isShow"
      src="../assets/images/yjt.png"
      class="cursor-pointer w-7 basis-7"
      @click="changeShow" />
    <div v-if="isShow" class="">
      <!-- 刷新页面 -->
      <refreshPage v-if="step === 1" />
      <!-- 内容页 -->
      <mainPage v-if="step === 2" />
    </div>
  </div>
</template>
<script lang="ts">
import cssText from "data-text:~/contents/index.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
  PlasmoMountShadowHost
} from "plasmo"
// import { sendToBackground } from "@plasmohq/messaging"
import {getToken} from "~util/commont.js"

import mainPage from "~component/mainPage.vue"
import refreshPage from "~component/refreshPage.vue"
import storage from "~util/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://saas.jishiyuchat.com/*"],
  css: ["resetOrigin.css"] // 配置原始页面的样式
}
const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  // 引入局部样式
  // 注意点：将:root更换为:host(plasmo-csui)让样式继承到plasmo-csui下
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
      step: 1, // 1：刷新页；2：内容页
      isShow: true // 是否展开
    }
  },
  components: { mainPage, refreshPage },
  plasmo: {
    mountShadowHost,
    getInlineAnchor,
    getStyle
  },
  methods: {
    changeShow() {
      console.log("changeShow", this.isShow)
      this.isShow = !this.isShow
    }
  },
  async mounted() {
    const token = await getToken()
    console.log("mounted-tokens", token)
    this.step = token ? 2 : 1
    storage.watch({
      'tokens': (c) => {
        console.log("tokenchange", c)
        this.step = c.newValue ? 2 : 1
      }
    })
  }
}
</script>
