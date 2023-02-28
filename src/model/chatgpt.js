import common from '@kelchy/common'
import { model } from '../model/index.js'
import { ChatGPTBrowserClient } from '@waylaidwanderer/chatgpt-api'
import env from '../helper/env.js'

const { log } = model

const clientOptions = {
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

const chatGptClient = new ChatGPTBrowserClient(clientOptions)
const conversationId = 'cd124db1-9b1d-4f12-a50d-828b1d2ba429'
const parentMessageId = '643f740c-0b9e-4dfb-ac28-c113c1931c09' // default parentId

async function score (sender, message) {
    const question = `on a score of 1-5, 5 being the most likely, how likely that this is a scam? received a message from \`${sender}\` and it says: \`${message}\`` 
    log.debug('CHATGPT_SCAM_SCORE', question)
    const { data, error } = await common.awaitWrap(chatGptClient.sendMessage(question, { conversationId, parentMessageId }), { timeout: 35000 })
    if (error) {
        log.error('ERR_SCAM_SCORE', error)
        throw error
    }
    return data
}

export default score
