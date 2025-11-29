import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@ApiTags('Payment Methods')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/payment-methods')
export class PaymentMethodController {
  constructor(private svc: PaymentMethodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment method for the user' })
  @ApiResponse({ status: 201, description: 'The payment method has been successfully created.', type: PaymentMethod })
  create(@Request() req, @Body() body: CreatePaymentMethodDto) {
    return this.svc.createForUser(req.user.sub, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get payment methods of the user' })
  @ApiResponse({ status: 200, description: 'Return all payment methods.', type: [PaymentMethod] })
  list(@Request() req) {
    return this.svc.findAllForUser(req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment method for the user' })
  @ApiResponse({ status: 200, description: 'The payment method has been successfully updated.', type: PaymentMethod })
  update(@Request() req, @Param('id') id: string, @Body() body: UpdatePaymentMethodDto) {
    return this.svc.updateForUser(req.user.sub, id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payment methods of the user' })
  @ApiResponse({ status: 200, description: 'The payment method has been successfully deleted.' })
  remove(@Request() req, @Param('id') id: string) {
    return this.svc.removeForUser(req.user.sub, id);
  }
}
