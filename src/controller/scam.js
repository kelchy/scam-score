import common from '@kelchy/common'
import chatgpt from '../model/chatgpt.js'
import perplexity from '../model/perplexity.js'
import { model } from '../model/index.js'

const { log } = model

export default {
  score: async (req, res) => {
    const { from, message } = req.body
    if (!from || !message) {
      return res.status(400).send('empty')
    }
    const question = `on a score of 1-5, 5 being the most likely, how likely that this is a scam? received a message from \`${from}\` and it says: \`${message}\``
    log.debug('SCAM_SCORE', `${from} ${message}`)
    let data = ""
    let error = ""
    let gpt = await common.awaitWrap(chatgpt(question))
    let plex = {}
    if (gpt.error) {
      plex = await common.awaitWrap(perplexity(question))
      if (plex.error) {
         error = plex.error.message
      }
      data = plex.data
    } else {
      data = gpt.data
    }
    res.json({ message: data, error })
  }
}
