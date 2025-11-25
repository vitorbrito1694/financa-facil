import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import {
  TransactionClass,
  TransactionFrequency,
  TransactionType,
} from '../transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '2025-11-24' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '2025-11-24' })
  @IsDateString()
  @IsNotEmpty()
  paymentAt: string;

  @ApiProperty({ example: 'EXPENSE' })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ example: 'FIXED' })
  @IsEnum(TransactionFrequency)
  @IsNotEmpty()
  frequency: TransactionFrequency;

  @ApiProperty({ example: 'ESSENTIAL' })
  @IsEnum(TransactionClass)
  @IsNotEmpty()
  class: TransactionClass;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  note?: boolean;

  @ApiProperty({ example: 'Descrição da transação' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'uuid-do-metodo-de-pagamento' })
  @IsUUID()
  payment_method_id: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  installmentCount?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  installmentNumber?: number;
}
