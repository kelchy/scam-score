import Server from '@kelchy/http-server'
import { model } from './model/index.js'
import scam from './route/index.js'

const { log } = model

const cors = {
  url: [],
  domain: [
    'circles.life',
    'circleslife.co'
  ]
}

const server = new Server(5000, { log, cors })
scam(server.app)
