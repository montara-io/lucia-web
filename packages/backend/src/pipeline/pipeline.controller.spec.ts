import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PipelineService } from './pipeline.service'
import { PipelineModule } from './pipeline.module'
import { GetPipelineRunsDTO } from './dto/get-pipeline-runs.dto'
import { PipelineRepository } from './pipeline.repository'

describe('pipeline controller tests', () => {
  it('get pipelines responds 200', async function () {
    const mock = {
      getPipelinesRuns: jest.fn(() => [{}]),
      getPipelines: jest.fn(() => [{}]),
    } as any as PipelineService
    const { app, close } = await createEnvironment(mock)
    const url = `/pipeline/all`

    await request(app.getHttpServer()).get(url).expect(200)
    expect(mock.getPipelines).toBeCalled()
    await close()
  })

  it('get pipeline runs responds 200', async function () {
    const mock = {
      getPipelineRuns: jest.fn(() => [{}]),
      getPipelines: jest.fn(() => [{}]),
    } as any as PipelineService
    const { app, close } = await createEnvironment(mock)
    const url = `/pipeline/runs`

    const query = { pipelineId: 'pipeline1' } as GetPipelineRunsDTO
    await request(app.getHttpServer()).get(url).query(query).expect(200)
    expect(mock.getPipelineRuns).toBeCalledWith(query)
    await close()
  })
})

async function createEnvironment(dataPipelineServiceMock: PipelineService) {
  jest.setTimeout(10 * 1000)

  const module = await Test.createTestingModule({
    imports: [PipelineModule],
  })
    .overrideProvider(PipelineService)
    .useValue(dataPipelineServiceMock)
    .overrideProvider(PipelineRepository)
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
