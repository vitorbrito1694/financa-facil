import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './transactions.entity';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction for the user' })
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.', type: Transaction })
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.sub, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions for the user' })
  @ApiResponse({ status: 200, description: 'Return all transactions.', type: [Transaction] })
  findAll(@Request() req) {
    return this.transactionsService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one transaction for the user' })
  @ApiResponse({ status: 200, description: 'Return the transaction.', type: Transaction })
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionsService.findOne(req.user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a transaction for the user' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully updated.', type: Transaction })
  update(@Request() req, @Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(req.user.sub, id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one transaction for the user' })
  @ApiResponse({ status: 200, description: 'The transaction has been successfully deleted.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.transactionsService.remove(req.user.sub, id);
  }
}
