import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionGroupService } from './transaction-group.service';
import { CreateTransactionGroupDto } from './dto/create-transaction-group.dto';
import { UpdateTransactionGroupDto } from './dto/update-transaction-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Transaction Groups')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/transaction-groups')
export class TransactionGroupController {
  constructor(private readonly transactionGroupService: TransactionGroupService) {}

  @Post()
  create(@Request() req, @Body() createTransactionGroupDto: CreateTransactionGroupDto) {
    return this.transactionGroupService.create(req.user.sub, createTransactionGroupDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.transactionGroupService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionGroupService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateTransactionGroupDto: UpdateTransactionGroupDto) {
    return this.transactionGroupService.update(id, req.user.sub, updateTransactionGroupDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.transactionGroupService.remove(id, req.user.sub);
  }
}
