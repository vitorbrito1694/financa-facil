import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionGroupDto {
  @ApiProperty({ example: 'Groceries' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Monthly grocery expenses', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
