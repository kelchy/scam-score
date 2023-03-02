import common from '@kelchy/common'
import { model } from '../model/index.js'
import { ChatGPTBrowserClient } from '@waylaidwanderer/chatgpt-api'
import env from '../helper/env.js'

const { log } = model

const browserClientOptions = {
  // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
  // Warning: This will expose your access token to a third party. Consider the risks before using this.
  reverseProxyUrl: 'https://chatgpt.duti.tech/api/conversation',
  // Access token from https://chat.openai.com/api/auth/session
  accessToken: env.ACCESS_TOKEN,
  // Cookies from chat.openai.com (likely not required if using reverse proxy server).
  cookies: '',
  // (Optional) Set to true to enable `console.debug()` logging
  // debug: true,
}

const chatGptBrowserClient = new ChatGPTBrowserClient(browserClientOptions)
const conversationId = 'cd124db1-9b1d-4f12-a50d-828b1d2ba429'
const parentMessageId = '643f740c-0b9e-4dfb-ac28-c113c1931c09' // default parentId
let parentId = ''

async function chatgpt (question) {
  let streaming = false
  // this 'timer' forces the promise below to bail out so logic can continue
  const timer = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!streaming) {
        reject(new Error('TIMEOUT'))
      } else {
        resolve()
      }
    }, 7000)
  })
  // set streaming true to tell 'timer' above to ignore
  // this is to avoid timing out when server seem to not receive the request
  const sout = (sdata) => {
    streaming = true
  }
  const gpt = chatGptBrowserClient.sendMessage(question, {
    conversationId,
    parentMessageId: parentId || parentMessageId,
    onProgress: sout
  })
  const { data, error } = await common.awaitWrap(Promise.all([
    timer,
    gpt
  ]), {
    timeout: 30000
  })
  if (error) {
    log.error('ERR_CHATGPT_SCORE', error)
    throw error
  }
  if (data[1].parentMessageId) parentId = data[1].parentMessageId
  return data[1]?.response
}

export default chatgpt
