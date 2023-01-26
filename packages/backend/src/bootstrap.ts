import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { BadRequestException, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common'
import PKGJSON from '../package.json'
import { middleware } from 'express-http-context'
import cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { loadConfig } from './utils/configuration'
import helmet from 'helmet'
import cors from 'cors'
import { createSparkJobRunBulk } from '../test/db-helper'
import { PipelineRepository } from './pipeline/pipeline.repository'
import { pipelineRunsData } from './seed/seed'

export async function bootstrap() {
  const config = loadConfig()

  const app = await NestFactory.create(AppModule)
  const logger: Logger = app.get(Logger)
  app.useLogger(logger)
  app.use(cookieParser())
  app.use(middleware)
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        logger.error('Class validation error %o', validationErrors)
        return new BadRequestException(validationErrors)
      },
    }),
  )

  enrichAppWithSwagger(app)

  app.use(helmet(), cors())

  const pipelineRepository: PipelineRepository = app.get(PipelineRepository)
  await createSparkJobRunBulk(pipelineRepository.manager().connection, pipelineRunsData)

  logger.log(`Server running on port ${config.http.port}`)
  logger.log('Server commit %s, mem: %o', process.env.GIT_COMMIT, process.memoryUsage())

  return { app, config }
}

export function enrichAppWithSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(PKGJSON.name)
    .setDescription(PKGJSON.description)
    .setVersion(PKGJSON.version)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  // please not that api-json will provide raw json file
  SwaggerModule.setup('api', app, document)
}
