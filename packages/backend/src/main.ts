import { bootstrap } from './bootstrap'

bootstrap().then(async ({ app, config }) => {
  const port = config.http.port
  await app.listen(port)
  console.log(`Listening on port ${port}`)
})
