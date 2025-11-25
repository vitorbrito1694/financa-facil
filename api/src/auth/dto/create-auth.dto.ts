import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class SendCodeResponseDto {
  @ApiProperty({ example: true })
  ok: boolean;
}

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-do-usuario' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;
}

export class VerifyCodeResponseDto {
  @ApiProperty({ example: true })
  ok: boolean;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
