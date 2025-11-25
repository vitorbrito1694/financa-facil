import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  SendCodeDto,
  SendCodeResponseDto,
  VerifyCodeDto,
  VerifyCodeResponseDto,
} from './dto/create-auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Código de verificação enviado com sucesso.',
    type: SendCodeResponseDto,
  })
  async sendCode(@Body() body: SendCodeDto) {
    if (!body?.email) throw new BadRequestException('Email é obrigatório');
    return this.authService.sendCode(body.email);
  }

  @Post('verify-code')
  @ApiResponse({
    status: 201,
    description: 'Login realizado com sucesso.',
    type: VerifyCodeResponseDto,
  })
  async verifyCode(
    @Body() body: VerifyCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body?.email || !body?.code)
      throw new BadRequestException('Email e código são obrigatórios');

    const { token, user } = await this.authService.verifyCode(
      body.email,
      body.code,
    );

    const maxAge =
      Number(process.env.COOKIE_MAX_AGE_MS) ||
      (() => {
        const jwtExpires = process.env.JWT_EXPIRES_IN || '7d';
        if (jwtExpires.endsWith('d'))
          return parseInt(jwtExpires) * 24 * 60 * 60 * 1000;
        return 7 * 24 * 60 * 60 * 1000;
      })();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge,
      path: '/',
    };

    res.cookie('auth', token, cookieOptions);
    return { ok: true, user: { id: user.id, email: user.email } };
  }
}
