import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsDateString, IsBoolean } from 'class-validator';
import { TransactionClass, TransactionFrequency, TransactionType } from '../transactions.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 150.0 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '2023-10-27T10:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  paymentAt?: string;

  @ApiProperty({ example: 'EXPENSE', enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ example: 'FIXED', enum: TransactionFrequency })
  @IsEnum(TransactionFrequency)
  @IsNotEmpty()
  frequency: TransactionFrequency;

  @ApiProperty({ example: 'ESSENTIAL', enum: TransactionClass })
  @IsEnum(TransactionClass)
  @IsNotEmpty()
  class: TransactionClass;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  note?: boolean;

  @ApiProperty({ example: 'Grocery shopping', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '34efd581-f495-4012-a971-a2a14008592b' })
  @IsUUID()
  payment_method_id: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  installmentCount?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  installmentNumber?: number;
}
