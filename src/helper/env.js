import version from '../../package.json' assert { type: 'json' }

export default {
  // optional
  VERSION: process.env.VERSION || version,
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
}
