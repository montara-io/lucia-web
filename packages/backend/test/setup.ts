import { ChildProcess, execSync, spawn } from 'child_process'
import retry from 'async-retry'
import { createConnection } from 'typeorm'
import { join } from 'path'
import { resolve } from 'path'
import { loadConfig } from '../src/utils/configuration'
import { flyway } from '../src/utils/flyway'
import { SparkJobRunEntity } from '../src/entity/spark-job-run.entity'

export const children: ChildProcess[] = []
export default async function globalSetup() {
  if (process.env.CI) {
    console.log('Running in CI skipping spinning database')
  } else {
    runDockerComposeDown()
    console.log('Running docker compose')
    const child = spawn('docker-compose', ['up', 'db'], {
      stdio: 'pipe',
    })
    children.push(child)
  }
  await waitForDB()
  await runMigrations()

  await sleep(5000)
  console.log('ready to start testing')
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function runDockerComposeDown() {
  try {
    execSync('docker-compose down')
  } catch {
    console.log('could not docker-compose down')
    process.exit(1)
  }
}

export async function waitForDB() {
  const config = loadConfig()
  return retry(
    async function () {
      console.log('trying...')
      console.log(`db with settings: ${JSON.stringify(config.db)}`)
      const connection = await createConnection({
        ...config.db,
        entities: [join(resolve(__dirname, '../src'), '**', '*.entity.{ts,js}'), SparkJobRunEntity],
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

async function runMigrations() {
  console.log('running Migrations')
  try {
    const config = loadConfig()
    await flyway(config, 'src/utils/migrations')
  } catch (e) {
    console.log('failed running migrations because of:', e)
    throw e
  }
  console.log('Done running Migrations')
}
