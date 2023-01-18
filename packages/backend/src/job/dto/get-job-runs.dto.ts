import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetJobRunsDTO {
  @ApiProperty({ required: true })
  @IsString()
  pipelineRunId: string
}
