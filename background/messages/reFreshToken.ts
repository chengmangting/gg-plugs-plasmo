// 重新获取token
import type { PlasmoMessaging } from "@plasmohq/messaging"
 import getToken from '~util/getToken'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log('message-handler',req)
  if(req.body.name==='getToken'){
  let token = await getToken();
    res.send({
      token
    })
  }
  // 要把token返回-异步
}
 
export default handler