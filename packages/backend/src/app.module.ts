import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { LoggerModule } from 'nestjs-pino'
import { loadConfig } from './utils/configuration'
import { PipelineModule } from './pipeline/pipeline.module'
import { JobModule } from './job/job.module'

@Module({
  imports: getDynamicImports(),
  controllers: [],
  providers: [],
})
export class AppModule {}

function getDynamicImports() {
  const config = loadConfig()
  const imports = [
    LoggerModule.forRoot(),
    ConfigModule,
    PipelineModule,
    JobModule,
    TypeOrmModule.forRoot({
      ...config.db,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
    }),
  ]

  return imports
}
