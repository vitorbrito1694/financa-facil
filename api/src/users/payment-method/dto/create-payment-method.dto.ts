import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PaymentMethodType } from '../payment-method.entity';

export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Itaú' })
  @IsString()
  name: string;

  @ApiProperty({ enum: PaymentMethodType, example: 'TED' })
  @IsEnum(PaymentMethodType)
  type: PaymentMethodType;

  @ApiProperty({ example: null, nullable: true, required: false })
  @ValidateIf(o => o.type === PaymentMethodType.CREDIT_CARD || o.paymentAt !== undefined)
  @IsNumber()
  paymentAt?: number;

  @ApiProperty({ example: null, nullable: true, required: false })
  @ValidateIf(o => o.type === PaymentMethodType.CREDIT_CARD || o.closingAt !== undefined)
  @IsNumber()
  closingAt?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
