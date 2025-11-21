import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  NotFoundException,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';

@Controller('users/:userId/payment-methods')
export class PaymentMethodController {
  constructor(private svc: PaymentMethodService) {}

  @Post()
  create(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: Partial<PaymentMethod>,
  ) {
    return this.svc.createForUser(userId, body);
  }

  @Get()
  list(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.svc.findAllForUser(userId);
  }

  @Patch(':id')
  update(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: Partial<PaymentMethod>,
  ) {
    return this.svc.updateForUser(userId, id, body);
  }

  @Delete(':id')
  remove(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.svc.removeForUser(userId, id);
  }
}
