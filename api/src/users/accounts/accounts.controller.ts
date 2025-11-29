import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/accounts')
export class AccountsController {
  constructor(private svc: AccountsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new account for the user' })
  @ApiResponse({ status: 201, description: 'The account has been successfully created.', type: Account })
  create(@Request() req, @Body() body: CreateAccountDto) {
    const payload = { ...body, balance: String(body.balance), owner: { id: req.user.sub } } as Partial<Account>;
    return this.svc.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts for the user' })
  @ApiResponse({ status: 200, description: 'Return all accounts.', type: [Account] })
  findAll(@Request() req) {
    return this.svc.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one account for the user' })
  @ApiResponse({ status: 200, description: 'Return the account.', type: Account })
  findOne(@Request() req, @Param('id') id: string) {
    return this.svc.findOne(id, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one account for the user' })
  @ApiResponse({ status: 200, description: 'The account has been successfully deleted.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.svc.remove(id, req.user.sub);
  }
}
