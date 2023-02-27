import Log from '@kelchy/log'
import * as env from '../helper/env.js'

class Model {
  constructor() {
    const log = new Log.Standard({
      debugging: env.NODE_ENV !== 'production'
    })
    this.log = log
  }
}

export const model = new Model()
