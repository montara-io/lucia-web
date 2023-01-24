import { AppModule } from '../src/app.module'
import { Test } from '@nestjs/testing'
import { PipelineService } from '../src/pipeline/pipeline.service'
import { PipelineRepository } from '../src/pipeline/pipeline.repository'
import { JobRepository } from '../src/job/job.repository'
import { JobService } from '../src/job/job.service'
import { createSparkJobRunBulk } from './db-helper'

export const initTest = async (sparkJobRuns?) => {
  try {
    const fixture = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
      controllers: [],
    }).compile()

    const pipelineRunService = fixture.get<PipelineService>(PipelineService)
    const pipelineRunRepository = fixture.get<PipelineRepository>(PipelineRepository)
    const jobRunService = fixture.get<JobService>(JobService)
    const jobRunRepository = fixture.get<JobRepository>(JobRepository)

    const app = fixture.createNestApplication()

    await app.init()
    const server = app.getHttpServer()

    if (sparkJobRuns) {
      await createSparkJobRunBulk(pipelineRunRepository.manager().connection, sparkJobRuns)
    }

    return { app, server, pipelineRunService, pipelineRunRepository, jobRunService, jobRunRepository }
  } catch (e) {
    console.log('** App Init failed')
    console.log(e)
  }
}
