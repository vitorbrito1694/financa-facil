import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { AccountType } from '../account.entity';

export class CreateAccountDto {
  @ApiProperty({ enum: AccountType, example: 'CURRENT_ACCOUNT' })
  @IsEnum(AccountType)
  type: AccountType;

  @ApiProperty({ example: 'Nubank' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1500.75 })
  @IsNumber()
  balance: number;

  @ApiProperty({ example: 'BRL', required: false })
  @IsOptional()
  @IsString()
  currency?: string;
}
