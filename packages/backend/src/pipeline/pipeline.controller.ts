import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { PipelineService } from './pipeline.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetPipelineRunsDTO } from './dto/get-pipeline-runs.dto'
import { PipelineDTO, PipelineRunDTO } from './dto/pipeline-run.dto'
import { InjectPinoLogger, Logger } from 'nestjs-pino'
import { GetByIdDTO } from './dto/get-by-id.dto'

@ApiTags('pipeline')
@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly pipelineService: PipelineService,
    @InjectPinoLogger(PipelineController.name)
    private readonly logger: Logger,
  ) {}

  @Get('/')
  async getPipeline(@Query(ValidationPipe) query: GetByIdDTO): Promise<PipelineRunDTO> {
    this.logger.debug('getting pipeline by id')
    const response = await this.pipelineService.getPipelineById(query.id)
    this.logger.debug('get pipeline by id: %o', response)

    return response
  }

  @ApiOperation({ summary: 'Get latest piplines data' })
  @ApiResponse({
    status: 200,
    description: 'Get latest piplines data',
  })
  @Get('/all')
  async getPipelines(): Promise<PipelineDTO[]> {
    this.logger.debug('getting pipelines')

    const response = await this.pipelineService.getPipelines()
    this.logger.debug('get pipelines response: %o', response)

    return response
  }

  @Get('/runs')
  async getPipelineRuns(@Query(ValidationPipe) query: GetPipelineRunsDTO): Promise<PipelineRunDTO[]> {
    this.logger.debug('getting pipeline runs')

    const response = await this.pipelineService.getPipelineRuns(query)
    this.logger.debug('get pipeline run response: %o', response)

    return response
  }
}
