import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { PipelineRepository } from './pipeline.repository'
import { ConfigService } from '@nestjs/config'
import { GetPipelineRunsDTO } from './dto/get-pipeline-runs.dto'
import { SparkJobRunEntity } from '../entity/spark-job-run.entity'
import { PipelineRunDTO } from './dto/pipeline-run.dto'
import { dateDiffInMinuts } from '../utils/date'

@Injectable()
export class PipelineService {
  constructor(
    private readonly repository: PipelineRepository,
    @InjectPinoLogger(PipelineService.name)
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {}

  async getPipelines(): Promise<PipelineRunDTO[]> {
    const pipelineEntities: SparkJobRunEntity[] = await this.repository.findPipelinesSummary()

    if (!pipelineEntities || pipelineEntities.length === 0) {
      this.logger.info('cannot find pipeline entities for pipelines summary')
      return null
    }

    return pipelineEntities.map((pipelineEntity) => this.convertPipelineEntityToPipelineDto(pipelineEntity))
  }

  async getPipelineRuns(dto: GetPipelineRunsDTO): Promise<PipelineRunDTO[]> {
    const pipelineEntities: SparkJobRunEntity[] = await this.repository.findPipelineRuns(dto.pipelineId)

    if (!pipelineEntities || pipelineEntities.length === 0) {
      this.logger.info('cannot find pipeline entities for pipeline runs')
      return null
    }

    return pipelineEntities.map((pipelineEntity) => this.convertPipelineEntityToPipelineDto(pipelineEntity))
  }

  async getPipelineById(pipelineId: string): Promise<PipelineRunDTO> {
    const pipelineEntity: SparkJobRunEntity = await this.repository.findPipelineById(pipelineId)

    if (!pipelineEntity) {
      this.logger.info('cannot find pipeline entity for pipeline id: %s', pipelineId)
      return null
    }

    return this.convertPipelineEntityToPipelineDto(pipelineEntity)
  }

  convertPipelineEntityToPipelineDto(entity: SparkJobRunEntity): PipelineRunDTO {
    const pipelineDto = new PipelineRunDTO()
    pipelineDto.pipelineRunId = entity.pipeline_run_id
    pipelineDto.pipelineId = entity.pipeline_id
    pipelineDto.avgNumOfExecutors = entity.num_of_executors
    pipelineDto.avgCpuUtilization = entity.cpu_utilization
    pipelineDto.avgPeakMemoryUsage = entity.peak_memory_usage
    pipelineDto.avgTotalBytesRead = entity.total_bytes_read
    pipelineDto.avgTotalBytesWritten = entity.total_bytes_written
    pipelineDto.avgTotalCoresNum = entity.total_cores_num
    pipelineDto.avgTotalCpuTimeUsed = entity.total_cpu_time_used
    pipelineDto.avgTotalCpuUptime = entity.total_cpu_uptime
    pipelineDto.avgTotalMemoryPerExecutor = entity.total_memory_per_executor
    pipelineDto.avgTotalShuffleRead = entity.total_shuffle_bytes_read
    pipelineDto.avgTotalShuffleWrite = entity.total_shuffle_bytes_written
    pipelineDto.numberOfJobs = entity.number_of_jobs
    pipelineDto.startDate = entity.start_time
    pipelineDto.endDate = entity.end_time
    pipelineDto.duration = dateDiffInMinuts(entity.start_time, entity.end_time)
    return pipelineDto
  }
}
