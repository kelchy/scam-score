import PerplexityAI from 'perplexityai'
import common from '@kelchy/common'
import { model } from '../model/index.js'

const { log } = model

async function score (question) {
  const { data, error } = await common.awaitWrap(PerplexityAI.search(question), { timeout: 30000 })
  if (error) {
    log.error('ERR_PERPLEXITY_SCAM', error)
    throw error
  }
  return data?.detailed
}

export default score
