import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetPipelineRunsDTO {
  @ApiProperty({ required: true })
  @IsString()
  pipelineId: string
}
