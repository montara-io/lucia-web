import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { PipelineRepository } from './pipeline.repository'
import { ConfigService } from '@nestjs/config'
import { PipelineRunEntity } from './entity/pipeline.entity'
import { PipelineDTO, PipelineRunDTO } from './dto/pipeline-run.dto'
import { GetPipelineRunsDTO } from './dto/get-pipeline-runs.dto'

@Injectable()
export class PipelineService {
  constructor(
    private readonly repository: PipelineRepository,
    @InjectPinoLogger(PipelineService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  async getPipelines(): Promise<PipelineDTO[]> {
    const pipelineEntities: PipelineRunEntity[] = await this.repository.findPipelinesSummary()

    if (!pipelineEntities || pipelineEntities.length === 0) {
      this.logger.info('cannot find pipeline entities for pipelines summary')
      return null
    }

    return pipelineEntities.map((pipelineEntity) => this.convertPipelineEntityToPipelineDto(pipelineEntity))
  }

  async getPipelineRuns(dto: GetPipelineRunsDTO): Promise<PipelineRunDTO[]> {
    const pipelineEntities: PipelineRunEntity[] = await this.repository.findPipelineRuns(dto.pipelineId)

    if (!pipelineEntities || pipelineEntities.length === 0) {
      this.logger.info('cannot find pipeline entities for pipeline runs')
      return null
    }

    return pipelineEntities.map((pipelineEntity) => this.convertPipelineEntityToDto(pipelineEntity))
  }

  async getPipelineById(pipelineId: string): Promise<PipelineRunDTO> {
    const pipelineEntity: PipelineRunEntity = await this.repository.findPipelineById(pipelineId)

    if (!pipelineEntity) {
      this.logger.info('cannot find pipeline entity for pipeline id: %s', pipelineId)
      return null
    }

    return this.convertPipelineEntityToDto(pipelineEntity)
  }

  convertPipelineEntityToDto(entity: PipelineRunEntity): PipelineRunDTO {
    const pipelineDto = new PipelineRunDTO()
    pipelineDto.id = entity.id
    pipelineDto.pipelineId = entity.pipeline_id
    pipelineDto.totalRuntime = entity.total_runtime
    pipelineDto.numberOfJobs = entity.number_of_jobs
    pipelineDto.totalCoreHours = entity.total_core_hours
    pipelineDto.avgWaitingTime = entity.avg_waiting_time
    pipelineDto.avgUtilization = entity.avg_utilization
    pipelineDto.avgCpuUtilization = entity.avg_cpu_utilization
    pipelineDto.avgMemoryUtilization = entity.avg_memory_utilization
    pipelineDto.deleted = entity.deleted
    pipelineDto.date = entity.date
    pipelineDto.created = entity.created
    pipelineDto.updated = entity.updated
    return pipelineDto
  }

  convertPipelineEntityToPipelineDto(entity: PipelineRunEntity): PipelineDTO {
    const pipelineDto = new PipelineDTO()
    pipelineDto.id = entity.id
    pipelineDto.pipelineId = entity.pipeline_id
    pipelineDto.avgRuntime = entity.total_runtime
    pipelineDto.numberOfJobs = entity.number_of_jobs
    pipelineDto.totalCoreHours = entity.total_core_hours
    pipelineDto.avgWaitingTime = entity.avg_waiting_time
    pipelineDto.avgUtilization = entity.avg_utilization
    pipelineDto.avgCpuUtilization = entity.avg_cpu_utilization
    pipelineDto.avgMemoryUtilization = entity.avg_memory_utilization
    pipelineDto.date = entity.date
    return pipelineDto
  }
}
