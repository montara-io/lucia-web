import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class GetByIdDTO {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
