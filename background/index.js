import "~util/storage"

import getTokens from "../util/getToken"

console.log("this is background!")

// getTokens()
chrome.tabs.query({ url: "http://test.xl.vertlet.com" }, (tabs) => {
  console.log("🚀 ~ chrome.tabs.query ~ tabs:", tabs)
})
