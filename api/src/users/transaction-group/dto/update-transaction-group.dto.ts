import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionGroupDto } from './create-transaction-group.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTransactionGroupDto extends PartialType(CreateTransactionGroupDto) {
  @ApiProperty({ example: 'Groceries', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Monthly grocery expenses', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
