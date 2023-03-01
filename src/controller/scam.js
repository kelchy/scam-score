import common from '@kelchy/common'
import chatgpt from '../model/chatgpt.js'

export default {
  score: async (req, res) => {
    const { from, message } = req.body
    if (!from || !message) {
      return res.status(400).send('empty')
    }
    const { data, error } = await common.awaitWrap(chatgpt(from, message))
    res.json({ message: data?.response, error: error?.message })
  }
}
