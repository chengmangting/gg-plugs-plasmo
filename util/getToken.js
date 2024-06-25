import storage from "~util/storage"

console.log("this is getToken.js")

export default async function getTokens() {
  console.log("getToken")
  const domain = process.env.PLASMO_PUBLIC_DOMAIN
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ url: domain }, (tabs) => {
      console.log("🚀 ~ chrome.tabs.query ~ tabs:", tabs)
      storage.set("tabId", tabs.length? tabs[0].id : null)
      if (!tabs.length) {
        storage.set("tokens", null)
        resolve(null)
        return
      }
      const newTabId = tabs[0].id
      chrome.scripting.executeScript(
        {
          target: { tabId: newTabId },
          func: function getLocalStrage() {
            console.log("🚀 ~ getLocalStrage ~ getLocalStrage:")
            return localStorage.getItem("Admin-Token")
          }
        },
        (res) => {
          console.log("getLocalStrage", res)
          const result = res.length && res[0].result
          storage.set("tokens", result)
          resolve(result)
        }
      )
    })
  })
}
