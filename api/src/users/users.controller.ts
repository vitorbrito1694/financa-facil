import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get('email')
  async getByEmail(@Query('email') email: string) {
    const user = await this.svc.findByEmail(email);
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.svc.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  @Patch(':id/status')
  setStatus(
    @Param('id') id: string,
    @Body() body: { active?: boolean; admin?: boolean },
  ) {
    const promises = [] as Promise<any>[];
    if (body.active !== undefined)
      promises.push(this.svc.setActive(id, body.active));
    if (body.admin !== undefined)
      promises.push(this.svc.setAdmin(id, body.admin));
    if (promises.length === 0) {
      return { success: false, message: 'No update fields provided' };
    }

    return Promise.all(promises)
      .then((results) => ({ success: true, results }))
      .catch((err) => ({ success: false, error: err?.message ?? String(err) }));
  }
}
