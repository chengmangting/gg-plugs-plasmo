import storage from "~util/storage"

console.log("this is getToken.js")
const env = process.env.NODE_ENV
let domain = env === "development" ? "test.xl.vertlet.com" : "toseek.net"
export default function getTokens() {
  chrome.tabs.query({ url: domain }, (tabs) => {
    console.log("🚀 ~ chrome.tabs.query ~ tabs:", tabs)
    let tabId = tabs[0].id
    chrome.scripting.executeScript(
      {
        target: tabId,
        function: getLocalStrage
      },
      (res) => {
        console.log("getLocalStrage", res)
        storage.set("tokens", res)
      }
    )
  })
}
function getLocalStrage() {
  console.log("🚀 ~ getLocalStrage ~ getLocalStrage:")
  return localStorage.getItem("Admin-Token")
}
