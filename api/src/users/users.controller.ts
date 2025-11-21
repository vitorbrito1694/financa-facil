import {
  Controller,
  Get,
  Param,
  Query,
  Patch,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get('email')
  getByEmail(@Query('email') email: string) {
    return this.svc.findByEmail(email);
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.svc.findOne(id);
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
