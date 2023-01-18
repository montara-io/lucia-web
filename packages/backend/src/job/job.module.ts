import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { JobController } from './job.controller'
import { JobService } from './job.service'
import { JobRepository } from './job.repository'

@Module({
  imports: [ConfigModule, LoggerModule.forRoot()],
  controllers: [JobController],
  providers: [JobService, JobRepository],
  exports: [JobService],
})
export class JobModule {}
