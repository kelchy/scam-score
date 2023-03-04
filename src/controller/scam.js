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
    const { message } = req.body
    if (!message) {
      return res.status(400).send('empty')
    }
    // fetch user details, we don't enforce the cookies for now
    const uri = `http://id.orbit.svc.cluster.local:3080/v1/labs/id/hash/user?hash=${hash}`
    // ignore error
    const { data: user } = await common.awaitWrap(client.get(uri))
    const question = `on a scale of 1-5, 5 being the most likely, how likely is it that this is a scam? \`${message}\``
    log.debug('SCAM_SCORE', `${user?.data?.id} ${hash} ${message}`)
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
