import { Controller, Get, Param, Patch, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailValidationPipe } from '../common/pipes/email-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':email')
  async getOne(@Param('email', EmailValidationPipe) email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  @Patch(':id/status')
  setStatus(@Param('id') id: string, @Body() body: { active?: boolean; admin?: boolean }) {
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
