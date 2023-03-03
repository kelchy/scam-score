import Client from '@kelchy/http-client'
import common from '@kelchy/common'
import chatgpt from '../model/chatgpt.js'
import openai from '../model/openai.js'
import { model } from '../model/index.js'

const { log } = model
const client = new Client({ timeout: 5000 })

export default {
  score: async (req, res) => {
    const hash = req.cookies.oid
    const { from, message } = req.body
    if (!from || !message) {
      return res.status(400).send('empty')
    }
    // fetch user details, we don't enforce the cookies for now
    const uri = `http://id.orbit.svc.cluster.local:3080/v1/labs/id/hash/user?hash=${hash}`
    // ignore error
    const { data: user } = await common.awaitWrap(client.get(uri))
    const question = `on a score of 1-5, 5 being the most likely, how likely that this is a scam? received a message from \`${from}\` and it says: \`${message}\``
    log.debug('SCAM_SCORE', `${user?.data?.id} ${hash} ${from} ${message}`)
    let data = ""
    let error = ""
    let gpt = await common.awaitWrap(chatgpt(question))
    let ai = {}
    if (gpt.error) {
      ai = await common.awaitWrap(openai(question))
      if (ai.error) {
         error = ai.error.message
      }
      data = ai.data
    } else {
      data = gpt.data
    }
    res.json({ message: data, error })
  }
}
