import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GetJobRunsDTO } from './dto/get-job-runs.dto'
import { JobService } from './job.service'
import { JobModule } from './job.module'
import { JobRepository } from './job.repository'
import { GetJobsDTO } from './dto/get-jobs.dto'

describe('job controller tests', () => {
  it('get pipeline job runs responds 200', async function () {
    const mock = {
      getPipelineJobRuns: jest.fn(),
    } as any as JobService
    const { app, close } = await createEnvironment(mock)
    const url = `/job/runs/by-pipeline-run-id`

    const query = { pipelineRunId: 'pipeline1' } as GetJobRunsDTO
    await request(app.getHttpServer()).get(url).query(query).expect(200)
    expect(mock.getPipelineJobRuns).toBeCalledWith(query)
    await close()
  })

  it('get all jobs responds 200', async function () {
    const mock = {
      getPipelineJobRuns: jest.fn(),
      getJobs: jest.fn(),
    } as any as JobService
    const { app, close } = await createEnvironment(mock)
    const url = `/job/all`

    await request(app.getHttpServer()).get(url).expect(200)
    expect(mock.getJobs).toBeCalled()
    await close()
  })

  it('get jobs runs by job id responds 200', async function () {
    const mock = {
      getPipelineJobRuns: jest.fn(),
      getJobs: jest.fn(),
      getJobRunsById: jest.fn(),
    } as any as JobService
    const { app, close } = await createEnvironment(mock)
    const url = `/job/runs/by-job-id`
    const query = { jobId: '1' } as GetJobsDTO
    await request(app.getHttpServer()).get(url).query(query).expect(200)
    expect(mock.getJobRunsById).toBeCalledWith(query)
    await close()
  })

  it('get job by id responds 200', async function () {
    const mock = {
      getJobById: jest.fn(),
    } as any as JobService
    const { app, close } = await createEnvironment(mock)
    const url = `/job/`
    const query = { jobId: '1' } as GetJobsDTO
    await request(app.getHttpServer()).get(url).query(query).expect(200)
    expect(mock.getJobById).toBeCalledWith(query)
    await close()
  })
})

async function createEnvironment(jobRunServiceMock: JobService) {
  jest.setTimeout(10 * 1000)

  const module = await Test.createTestingModule({
    imports: [JobModule],
  })
    .overrideProvider(JobService)
    .useValue(jobRunServiceMock)
    .overrideProvider(JobRepository)
    .useValue({})
    .compile()

  const app = module.createNestApplication()
  await app.init()
  const close = async function () {
    await app.close()
    await module.close()
  }
  return { module, app, close }
}
