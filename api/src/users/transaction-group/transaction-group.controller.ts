import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionGroupService } from './transaction-group.service';
import { CreateTransactionGroupDto } from './dto/create-transaction-group.dto';
import { UpdateTransactionGroupDto } from './dto/update-transaction-group.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionGroup } from './transaction-group.entity';

import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('Transaction Groups')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/transaction-groups')
export class TransactionGroupController {
  constructor(private readonly transactionGroupService: TransactionGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction group for the user' })
  @ApiResponse({
    status: 201,
    description: 'The transaction group has been successfully created.',
    type: TransactionGroup,
  })
  create(@Request() req, @Body() createTransactionGroupDto: CreateTransactionGroupDto) {
    return this.transactionGroupService.create(req.user.sub, createTransactionGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transaction groups for the user' })
  @ApiResponse({ status: 200, description: 'Return all transaction groups.', type: [TransactionGroup] })
  findAll(@Request() req) {
    return this.transactionGroupService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one transaction group for the user' })
  @ApiResponse({ status: 200, description: 'Return the transaction group.', type: TransactionGroup })
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionGroupService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction group for the user' })
  @ApiResponse({
    status: 200,
    description: 'The transaction group has been successfully updated.',
    type: TransactionGroup,
  })
  update(@Request() req, @Param('id') id: string, @Body() updateTransactionGroupDto: UpdateTransactionGroupDto) {
    return this.transactionGroupService.update(id, req.user.sub, updateTransactionGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one transaction group for the user' })
  @ApiResponse({ status: 200, description: 'The transaction group has been successfully deleted.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.transactionGroupService.remove(id, req.user.sub);
  }
}
