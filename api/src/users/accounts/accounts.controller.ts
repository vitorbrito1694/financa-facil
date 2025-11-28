import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/accounts')
export class AccountsController {
  constructor(private svc: AccountsService) {}

  @Post()
  create(@Request() req, @Body() body: Partial<Account>) {
    const payload = { ...body, owner: { id: req.user.sub } } as Partial<Account>;
    return this.svc.create(payload);
  }

  @Get()
  findAll(@Request() req) {
    return this.svc.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.svc.findOne(id, req.user.sub);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.svc.remove(id, req.user.sub);
  }
}
