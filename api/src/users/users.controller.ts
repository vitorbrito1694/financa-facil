import { Controller, Get, Param, Patch, Body, NotFoundException, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailValidationPipe } from '../common/pipes/email-validation.pipe';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':email')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Buscar usuário por email' })
  @ApiParam({ name: 'email', description: 'Email do usuário', example: 'user@example.com' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async getOne(@Param('email', EmailValidationPipe) email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @Patch(':id/status')
  @UseGuards(AuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Atualizar status do usuário (ativo/admin)' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateUserStatusDto })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  setStatus(@Param('id') id: string, @Body() body: UpdateUserStatusDto) {
    const promises = [] as Promise<any>[];
    if (body.active !== undefined) promises.push(this.userService.setActive(id, body.active));
    if (body.admin !== undefined) promises.push(this.userService.setAdmin(id, body.admin));
    if (promises.length === 0) {
      return { success: false, message: 'No update fields provided' };
    }

    return Promise.all(promises)
      .then(results => ({ success: true, results }))
      .catch(err => ({ success: false, error: err?.message ?? String(err) }));
  }
}
