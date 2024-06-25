import { sendToBackground } from "@plasmohq/messaging"


export async function getToken(){
    console.log('come in getToken function')
    const result = await sendToBackground({
        body: {
          type: "getToken"
        },
        name: "reFreshToken"
      })
    console.log('result',result)
    return result.token
}