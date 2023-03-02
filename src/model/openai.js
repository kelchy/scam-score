import { ChatGPT } from "chatgpt-official";
import common from '@kelchy/common'
import { model } from '../model/index.js'
import env from '../helper/env.js'

const { log } = model

const options = {
  temperature: 0.7, // OpenAI parameter
  max_tokens: 100, // OpenAI parameter [Max response size by tokens]
  top_p: 0.9, // OpenAI parameter
  frequency_penalty: 0, // OpenAI parameter
  presence_penalty: 0, // OpenAI parameter
  instructions: `You are ChatGPT, a large language model trained by OpenAI.`, // initial instructions for the bot
  model: "gpt-3.5-turbo", // OpenAI parameter  `gpt-3.5-turbo` is PAID
}
const bot = new ChatGPT(env.OPENAI_KEY, options)

async function openai (question) {
  const { data, error } = await common.awaitWrap(bot.ask(question), { timeout: 30000 })
  if (error) {
    log.error('ERR_OPENAI_SCORE', error)
    throw error
  }
  return data
}

export default openai
