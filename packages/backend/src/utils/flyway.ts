import { spawn } from 'child_process'
import download from 'node-flywaydb/lib/download'

export function flyway(conf: Record<string, any>, sqlLocation: string) {
  const config = {
    flywayArgs: {
      driver: 'org.postgresql.Driver',
      url: `jdbc:postgresql://${conf.db.host}:${conf.db.port}/${conf.db.database}?autoreconnect=true`,
      user: conf.db.username,
      password: conf.db.password,
      schemas: 'postgres',
      locations: `filesystem:${sqlLocation}`,
    },
    version: '9.0.4',
  }

  function configFlywayArgs(config) {
    const flywayArgs = config.flywayArgs || {}
    const flywayArgsKeys = Object.keys(flywayArgs)

    return flywayArgsKeys.map(function (key) {
      return `-${key}=${flywayArgs[key]}`
    })
  }
  return new Promise<void>((resolve, reject) => {
    download.ensureArtifacts(config, function (err, flywayBin) {
      const workingDir = process.cwd()
      err && reject(err)
      const args = configFlywayArgs(config).concat(['migrate'])

      const child = spawn(flywayBin, args, {
        env: Object.assign({}, process.env),
        cwd: workingDir,
        stdio: 'inherit',
        windowsVerbatimArguments: true,
      })

      child.on('close', (code) => {
        code === 0 ? resolve() : reject()
      })
    })
  })
}
