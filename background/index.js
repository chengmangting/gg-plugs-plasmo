import storage from "~util/storage"
import getTokens from "../util/getToken"

(async function (){

  await getTokens()

// 添加事件监听器
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  console.log("chrome.tabs.onUpdated.addListener", tabId, changeInfo, tab)
  const newTabId = await storage.get("tabId")
  if (tabId === newTabId&&tab.status==='complete'&& tab.title==="登录") {
    console.log('重新登录!',tab.title)
    // 监听目标tab的token变化——避免退出重新登录其他账号，插件登录还是原账号
    chrome.scripting.executeScript(
      {
        target: { tabId: newTabId },
        func: function getLocalStrage() {
          console.log("🚀 ~ addListener-onUpdated ~ getLocalStrage:")
          return localStorage.getItem("Admin-Token")
        }
      },
      (res) => {
        console.log("addListener-getLocalStrage", res)
        const result = res.length && res[0].result
        storage.set("tokens", result)
      }
    )
  }
})
})()