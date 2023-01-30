import { INestApplication } from '@nestjs/common'
import { createSparkJobRunBulk, deleteTableDataFromDB } from './db-helper'
import { initTest } from './e2e-init'
import { JobService } from '../src/job/job.service'
import { JobRepository } from '../src/job/job.repository'
import { GetJobsDTO } from '../src/job/dto/get-jobs.dto'
import { SparkJobRunEntity } from '../src/entity/spark-job-run.entity'

console.info = jest.fn()
console.error = jest.fn()

jest.mock('express-http-context')

const pipelineId = '6c933183-e4e8-3bb8-bebc-f23f380676d1'
const jobId = 'job1'

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
    end_time: '2022-09-04T08:23:25.960Z',
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
    end_time: '2022-09-05T08:23:25.960Z',
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
    await deleteTableDataFromDB(repository.manager(), [SparkJobRunEntity])
    jest.clearAllMocks()
  })

  it('get job by id success test', async () => {
    await createDb(repository, sparkJobRun)

    const job = await jobService.getJobById({
      jobId: jobId,
    } as GetJobsDTO)

    expect(job).toBeDefined()
    expect(job.sparkJobMetrics?.avgCpuUtilization).toBe(750)
    expect(job.sparkJobMetrics?.avgNumOfExecutors).toBe(750)
    expect(job.sparkJobMetrics?.avgPeakMemoryUsage).toBe(750)
    expect(job.sparkJobMetrics?.avgTotalBytesRead).toBe(750)
    expect(job.sparkJobMetrics?.avgTotalBytesWritten).toBe(750)
    expect(job.sparkJobMetrics?.avgTotalCoresNum).toBe(750)
    expect(job.sparkJobMetrics?.avgTotalCpuTimeUsed).toBe(750)
    expect(job.sparkJobMetrics?.avgTotalMemoryPerExecutor).toBe(750)
    expect(job.endDate.toISOString()).toBe('2022-09-05T08:23:25.960Z')
  })
})

const createDb = async (repository, sparkJobRuns) => {
  await createSparkJobRunBulk(repository.manager().connection, sparkJobRuns)
}
