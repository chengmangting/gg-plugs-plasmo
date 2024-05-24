import storage from "~util/storage"

console.log("this is getToken.js")
const env = process.env.NODE_ENV
let domain =
  env === "development" ? "http://test.xl.vertlet.com/*" : "http://toseek.net/*"
export default function getTokens() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ url: domain }, (tabs) => {
      console.log("🚀 ~ chrome.tabs.query ~ tabs:", tabs)
      if(!tabs.length) return
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: function getLocalStrage() {
            console.log("🚀 ~ getLocalStrage ~ getLocalStrage:")
            return localStorage.getItem("Admin-Token")
          }
        },
        (res) => {
          console.log("getLocalStrage", res)
          storage.set("tokens", res.length && res[0].result)
          resolve(res.result)
        }
      )
    })
  })
}
