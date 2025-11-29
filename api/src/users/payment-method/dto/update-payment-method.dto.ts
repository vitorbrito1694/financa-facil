import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';
import { PaymentMethodType } from '../payment-method.entity';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
  @ApiProperty({ example: 'BTG', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ enum: PaymentMethodType, example: 'CREDIT_CARD', required: false })
  @IsOptional()
  @IsEnum(PaymentMethodType)
  type?: PaymentMethodType;

  @ApiProperty({ example: 6, nullable: true, required: false })
  @IsOptional()
  @IsNumber()
  paymentAt?: number;

  @ApiProperty({ example: 26, nullable: true, required: false })
  @IsOptional()
  @IsNumber()
  closingAt?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
