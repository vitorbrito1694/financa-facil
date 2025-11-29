import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'Define se o usuário está ativo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    description: 'Define se o usuário é administrador',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  admin?: boolean;
}
