<template>
  <div class="">
    <img src="../assets/icon.png" class="w-20" />
    <p>当前未登录状态</p>
    <p>请现在浏览器内登录求索系统</p>
    <el-button type="primary" @click="refreshHandle" :loading="loading"
      >刷新</el-button
    >
  </div>
</template>

<script>
// import { sendToBackground } from "@plasmohq/messaging"
import { ElButton } from "element-plus"

import { getToken } from "~util/commont.js"

export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      loading: false
    }
  },
  components: { ElButton },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    async refreshHandle() {
      this.loading = true
      await getToken()
      this.loading = false
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log("refreshPage-mounted")
  }
}
</script>
