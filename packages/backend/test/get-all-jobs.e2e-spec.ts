import { INestApplication } from '@nestjs/common'
import {
  createPipelineBulk,
  createPipelineJobRunBulk,
  createSparkJobRunMetricsBulk,
  deleteTableDataFromDB,
} from './db-helper'
import { initTest } from './e2e-init'
import { PipelineRunEntity } from '../src/pipeline/entity/pipeline.entity'
import { JobRunEntity } from '../src/job/entity/job.entity'
import { SparkJobMetricsEntity } from '../src/job/entity/spark-job-metrics.entity'
import { JobService } from '../src/job/job.service'
import { JobRepository } from '../src/job/job.repository'

console.info = jest.fn()
console.error = jest.fn()

jest.mock('express-http-context')

const pipelineId = '6c933183-e4e8-3bb8-bebc-f23f380676d1'
const jobId = 'job1'

const pipelineRunsData = [
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22651',
    pipeline_id: pipelineId,
    total_runtime: 1000,
    number_of_jobs: 1,
    total_core_hours: 1,
    avg_waiting_time: 1000,
    avg_utilization: 10,
    avg_cpu_utilization: 12,
    avg_memory_utilization: 50,
    date: '2022-09-04T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22652',
    pipeline_id: pipelineId,
    total_runtime: 1000,
    number_of_jobs: 1,
    total_core_hours: 1,
    avg_waiting_time: 1000,
    avg_utilization: 10,
    avg_cpu_utilization: 12,
    avg_memory_utilization: 51,
    date: '2022-09-05T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
]

const jobRunsData = [
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22655',
    pipeline_run_id: pipelineId,
    job_id: jobId,
    spark_job_metrics_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22645',
    date: '2022-09-05T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22656',
    pipeline_run_id: pipelineId,
    job_id: jobId,
    spark_job_metrics_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22645',
    date: '2022-09-04T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22657',
    pipeline_run_id: pipelineId,
    job_id: 'job2',
    spark_job_metrics_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22646',
    date: '2022-09-06T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22658',
    pipeline_run_id: pipelineId,
    job_id: 'job2',
    spark_job_metrics_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22645',
    date: '2022-09-06T08:23:25.960Z',
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
]

const sparkJobMetricsData = [
  {
    id: 'af30f3a3-9194-4f04-9a3d-d93992d22655',
    core_hours: 7,
    cpu_utilization: 7,
    job_run_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22655',
    memory_utilization: 7,
    number_of_cores: 7,
    runtime: 7,
    used_memory: 7,
    utilization: 7,
    waiting_time: 7,
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'af30f3a3-9194-4f04-9a3d-d93992d22656',
    core_hours: 7,
    cpu_utilization: 7,
    job_run_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22656',
    memory_utilization: 7,
    number_of_cores: 7,
    runtime: 7,
    used_memory: 7,
    utilization: 7,
    waiting_time: 7,
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'af30f3a3-9194-4f04-9a3d-d93992d22657',
    core_hours: 8,
    cpu_utilization: 8,
    job_run_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22657',
    memory_utilization: 8,
    number_of_cores: 8,
    runtime: 8,
    used_memory: 8,
    utilization: 8,
    waiting_time: 8,
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
  {
    id: 'af30f3a3-9194-4f04-9a3d-d93992d22658',
    core_hours: 8,
    cpu_utilization: 8,
    job_run_id: 'cf30f3a3-9194-4f04-9a3d-d93992d22657',
    memory_utilization: 8,
    number_of_cores: 8,
    runtime: 8,
    used_memory: 8,
    utilization: 8,
    waiting_time: 8,
    created: '2022-09-04T08:23:25.960Z',
    updated: '2022-09-04T08:23:25.960Z',
    deleted: false,
  },
]

describe('get job by id component test', () => {
  let app: INestApplication
  let jobService: JobService
  let repository: JobRepository

  jest.setTimeout(1000 * 30)

  beforeAll(async () => {
    const services = await initTest()
    app = services.app
    jobService = services.jobRunService
    repository = services.jobRunRepository
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    await deleteTableDataFromDB(repository.manager(), [PipelineRunEntity, JobRunEntity, SparkJobMetricsEntity])
    jest.clearAllMocks()
  })

  it('get all jobs success test', async () => {
    await createDb(repository, pipelineRunsData, jobRunsData, sparkJobMetricsData)

    const jobs = await jobService.getJobs()

    expect(jobs).toBeDefined()
    expect(jobs[0].jobId).toBe('job2')
    expect(jobs[1].jobId).toBe('job1')
    expect(jobs[1].sparkJobMetrics.waitingTime).toBe(7)
    expect(jobs[0].sparkJobMetrics.waitingTime).toBe(8)
  })
})

const createDb = async (repository, pipelines, jobs, sparkMetrics) => {
  await createPipelineBulk(repository.manager().connection, pipelines)
  await createPipelineJobRunBulk(repository.manager().connection, jobs)
  await createSparkJobRunMetricsBulk(repository.manager().connection, sparkMetrics)
}
