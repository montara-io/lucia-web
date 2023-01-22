import { INestApplication } from '@nestjs/common'
import { createPipelineBulk, deleteTableDataFromDB } from './db-helper'
import { initTest } from './e2e-init'
import { PipelineRepository } from '../src/pipeline/pipeline.repository'
import { PipelineService } from '../src/pipeline/pipeline.service'
import { PipelineRunEntity } from '../src/pipeline/entity/pipeline.entity'
console.info = jest.fn()
console.error = jest.fn()

jest.mock('express-http-context')

const getLatestPipelinesData = [
  {
    id: 'cf30f3a3-9194-4f04-9a3d-d93992d22651',
    pipeline_id: '6c933183-e4e8-3bb8-bebc-f23f380676d1',
    name: 'pipeline1',
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
    pipeline_id: '6c933183-e4e8-3bb8-bebc-f23f380676d1',
    name: 'pipeline1',
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
    await deleteTableDataFromDB(repository.manager(), [PipelineRunEntity])
    jest.clearAllMocks()
  })

  it('get pipeline summary success test', async () => {
    await createDb(repository, getLatestPipelinesData)

    const pipelines = await dataPipelineService.getPipelines()

    expect(pipelines.length).toEqual(1)
    expect(pipelines[0].avgRuntime).toEqual(2000)
    expect(pipelines[0].avgWaitingTime).toEqual(1000)
  })
})

const createDb = async (repository, pipelines) => {
  await createPipelineBulk(repository.manager().connection, pipelines)
}
