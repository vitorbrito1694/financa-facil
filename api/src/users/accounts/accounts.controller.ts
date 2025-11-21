import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';

@Controller('users/:userId/accounts')
export class AccountsController {
  constructor(private svc: AccountsService) {}

  @Post()
  create(@Param('userId') userId: string, @Body() body: Partial<Account>) {
    // allow passing owner as userId for convenience
    const payload = { ...body, owner: { id: userId } } as Partial<Account>;
    return this.svc.create(payload);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
