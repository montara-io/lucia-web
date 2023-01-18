import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetJobsDTO {
  @ApiProperty({ required: true })
  @IsString()
  jobId: string
}
