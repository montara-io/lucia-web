import { readFileSync } from 'fs'
import { readFile } from 'fs/promises'
import yaml, { YAMLException } from 'js-yaml'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { merge } from 'lodash'

export const defaultConfig = join(process.cwd(), 'src/utils/config', 'default.yml')

function handleYAMLError(error: YAMLException, configFileName: string) {
  const { ...restOfError } = error
  const { ...restOfMark } = (restOfError as any).mark
  const errorWithoutPII = {
    ...restOfError,
    mark: restOfMark,
    message: `bad yaml file: ${configFileName}`,
  } as Error
  throw errorWithoutPII
}

const loadConfigFile = (configFileName = process.env.service_config || defaultConfig) => {
  try {
    const yamlRes = yaml.load(readFileSync(configFileName, 'utf8'))
    return yamlRes as Record<string, any>
  } catch (error) {
    if (error instanceof YAMLException) {
      handleYAMLError(error, configFileName)
    } else {
      throw error
    }
  }
}
const loadConfigFileAsync = async (configFileName = process.env.service_config || defaultConfig) => {
  try {
    const content = await readFile(configFileName, 'utf8')
    return yaml.load(content) as Record<string, any>
  } catch (error) {
    if (error instanceof YAMLException) {
      handleYAMLError(error, configFileName)
    } else {
      throw error
    }
  }
}

let config = null
let interval = null
export const loadConfig = (configFileName = process.env.service_config || defaultConfig, withRefresh = false) => {
  if (!config) {
    config =
      configFileName === defaultConfig
        ? loadConfigFile(configFileName)
        : merge(loadConfigFile(defaultConfig), loadConfigFile(configFileName))

    config.db.password = process.env.DB_PW ?? config.db.password
    config.db.username = process.env.DB_USER ?? config.db.username
    config.db.port = process.env.DB_PORT ?? config.db.port
    config.db.host = process.env.DB_HOST ?? config.db.host
  }
  if (withRefresh) {
    refreshConfig(configFileName)
  }
  const configProxy = new Proxy(config, {
    get: function (target, prop) {
      return config[prop]
    },
  })
  return configProxy
}

export const loadConfigModule = (configFileName = process.env.service_config || defaultConfig) => {
  return ConfigModule.forRoot({
    load: [() => loadConfig(configFileName)],
    isGlobal: true,
  })
}

export function refreshConfig(configFileName: string) {
  if (interval) {
    return
  }
  const refreshTime = config?.refresh || 1000 * 60 * 10 //aka 10 minutes
  interval = setInterval(async () => {
    config =
      configFileName === defaultConfig
        ? await loadConfigFileAsync(configFileName)
        : merge(...(await Promise.all([loadConfigFileAsync(defaultConfig), loadConfigFileAsync(configFileName)])))
  }, refreshTime)
}

export function clearConfigCache() {
  config = null
  interval && clearInterval(interval)
  interval = null
}

export function getSecretlessConfigString(config) {
  const safeConfig = JSON.parse(JSON.stringify(config))
  iterateOverConfigAndClean(safeConfig)
  return JSON.stringify(safeConfig)
}

function iterateOverConfigAndClean(config) {
  for (const property in config) {
    if (typeof config[property] == 'object') {
      iterateOverConfigAndClean(config[property])
    } else {
      const propertyLC = property.toLowerCase()
      if (
        propertyLC.startsWith('password') ||
        propertyLC.startsWith('pw') ||
        propertyLC.startsWith('token') ||
        propertyLC.startsWith('username') ||
        propertyLC.startsWith('key') ||
        propertyLC.startsWith('secret')
      ) {
        config[property] = 'hidden'
      }
    }
  }
}
