import { execSync } from 'child_process'
import { children } from './setup'

module.exports = async function teardown() {
  if (!process.env.CI) {
    execSync('docker-compose down --remove-orphans')
  }
  children.forEach((child) => {
    child.kill('SIGKILL')
  })
}
