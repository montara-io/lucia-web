import { Module } from '@nestjs/common'
import { PipelineController } from './pipeline.controller'
import { PipelineService } from './pipeline.service'
import { PipelineRepository } from './pipeline.repository'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [ConfigModule, LoggerModule.forRoot()],
  controllers: [PipelineController],
  providers: [PipelineService, PipelineRepository],
  exports: [PipelineService],
})
export class PipelineModule {}
