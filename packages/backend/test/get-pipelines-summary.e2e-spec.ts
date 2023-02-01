import { INestApplication } from '@nestjs/common'
import { createSparkJobRunBulk, deleteTableDataFromDB } from './db-helper'
import { initTest } from './e2e-init'
import { PipelineRepository } from '../src/pipeline/pipeline.repository'
import { PipelineService } from '../src/pipeline/pipeline.service'
import { SparkJobRunEntity } from '../src/entity/spark-job-run.entity'

console.info = jest.fn()
console.error = jest.fn()

jest.mock('express-http-context')

const pipelineId = 'pipeline'
const jobId = 'job'

const sparkJobRun = [
  {
    id: jobId + 1,
    pipeline_id: pipelineId,
    job_id: jobId,
    pipeline_run_id: pipelineId + 1,
    num_of_executors: 500,
    total_memory_per_executor: 500,
    total_bytes_read: 500,
    total_bytes_written: 500,
    total_shuffle_bytes_read: 500,
    total_shuffle_bytes_written: 500,
    total_cpu_time_used: 500,
    total_cpu_uptime: 500,
    peak_memory_usage: 500,
    total_cores_num: 500,
    cpu_utilization: 500,
    start_time: '2022-09-03T08:23:25.960Z',
    end_time: '2022-09-05T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: jobId + 2,
    pipeline_id: pipelineId,
    job_id: jobId,
    pipeline_run_id: pipelineId + 2,
    num_of_executors: 1000,
    total_memory_per_executor: 1000,
    total_bytes_read: 1000,
    total_bytes_written: 1000,
    total_shuffle_bytes_read: 1000,
    total_shuffle_bytes_written: 1000,
    total_cpu_time_used: 1000,
    total_cpu_uptime: 1000,
    peak_memory_usage: 1000,
    total_cores_num: 1000,
    cpu_utilization: 1000,
    start_time: '2022-09-03T08:23:25.960Z',
    end_time: '2022-09-07T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: jobId + 3,
    pipeline_id: 'pipelineId2',
    job_id: jobId,
    pipeline_run_id: pipelineId + 2,
    num_of_executors: 1000,
    total_memory_per_executor: 1000,
    total_bytes_read: 1000,
    total_bytes_written: 1000,
    total_shuffle_bytes_read: 1000,
    total_shuffle_bytes_written: 1000,
    total_cpu_time_used: 1000,
    total_cpu_uptime: 1000,
    peak_memory_usage: 1000,
    total_cores_num: 1000,
    cpu_utilization: 1000,
    start_time: '2022-09-03T08:23:25.960Z',
    end_time: '2022-09-08T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
]

describe('get pipelines summary component test', () => {
  let app: INestApplication
  let dataPipelineService: PipelineService
  let repository: PipelineRepository

  jest.setTimeout(1000 * 30)

  beforeAll(async () => {
    const services = await initTest()
    app = services.app
    dataPipelineService = services.pipelineRunService
    repository = services.pipelineRunRepository
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await deleteTableDataFromDB(repository.manager(), [SparkJobRunEntity])
    jest.clearAllMocks()
  })

  it('get pipeline summary success test', async () => {
    await createDb(repository, sparkJobRun)

    const pipelines = await dataPipelineService.getPipelines()

    expect(pipelines.length).toEqual(2)
    expect(
      Math.floor(
        pipelines.filter((pipeline) => {
          return pipeline.pipelineId == pipelineId
        })[0].avgDuration / 1440,
      ),
    ).toEqual(3)
  })
})

const createDb = async (repository, sparkJobRun) => {
  await createSparkJobRunBulk(repository.manager().connection, sparkJobRun)
}
