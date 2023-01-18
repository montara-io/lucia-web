import { Connection, createConnection } from 'typeorm'
import retry from 'async-retry'
import { join, resolve } from 'path'
import { loadConfig } from './configuration'

export async function addSeedData(seederFunction: (connection: Connection) => Promise<void>, tableName?: string) {
  const connection = await waitForDB()
  const shouldSeedTable = await checkIfSeedNeeded(connection, tableName)
  if (shouldSeedTable) {
    //await createConstraints(connection)
    await seederFunction(connection)
    await markSeedCreated(connection, tableName)
  }
  await connection.close()
}

export async function waitForDB() {
  const config = loadConfig()
  return retry(
    async function () {
      console.log('trying...')
      const connection = await createConnection({
        ...config.db,
        entities: [join(resolve(__dirname, '../src'), '**', '*.entity.{ts,js}')],
        synchronize: false,
      })
      if (connection) {
        console.log('Connected')
      }
      return connection
    },
    {
      retries: 9,
      minTimeout: 1000,
      onRetry: (_error, attempt) => console.log(`Connection failed, retry ${attempt}, error is ${_error}`),
    },
  )
}

async function checkIfSeedNeeded(connection: Connection, tableName?: string) {
  const seedName = 'seed' + tableName
  const result = await connection.createEntityManager().query(`select created from seed where id='${seedName}'`)
  return result.length === 0
}

async function markSeedCreated(connection: Connection, tableName?: string) {
  const seedName = 'seed' + tableName
  return connection.createEntityManager().query(`insert INTO seed (id, created) VALUES ('${seedName}', true)`)
}
