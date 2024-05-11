import type { PlasmoMessaging } from "@plasmohq/messaging"
 import getToken from '~util/getToken'

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  if(req.body.name==='getToken'){
    getToken()
  }
}
 
export default handler