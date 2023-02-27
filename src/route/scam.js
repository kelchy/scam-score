import ctrl from '../controller/index.js'

export default (app) => {
  app.post(`/v1/labs/nlp/scam/score`, ctrl.scam.score)
}
