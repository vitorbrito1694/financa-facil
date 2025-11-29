import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionClass, TransactionFrequency, TransactionType } from '../transactions.entity';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({ example: 150.0, required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ example: '2023-10-27T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ example: '2023-10-27T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  paymentAt?: string;

  @ApiProperty({ example: 'EXPENSE', enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @ApiProperty({ example: 'FIXED', enum: TransactionFrequency, required: false })
  @IsOptional()
  @IsEnum(TransactionFrequency)
  frequency?: TransactionFrequency;

  @ApiProperty({ example: 'ESSENTIAL', enum: TransactionClass, required: false })
  @IsOptional()
  @IsEnum(TransactionClass)
  class?: TransactionClass;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  note?: boolean;

  @ApiProperty({ example: 'Grocery shopping', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '34efd581-f495-4012-a971-a2a14008592b', required: false })
  @IsOptional()
  @IsUUID()
  payment_method_id?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  installmentCount?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  installmentNumber?: number;
}
