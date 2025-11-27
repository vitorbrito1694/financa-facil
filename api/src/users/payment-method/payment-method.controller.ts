import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Methods')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users/payment-methods')
export class PaymentMethodController {
  constructor(private svc: PaymentMethodService) {}

  @Post()
  create(@Request() req, @Body() body: Partial<PaymentMethod>) {
    return this.svc.createForUser(req.user.sub, body);
  }

  @Get()
  list(@Request() req) {
    return this.svc.findAllForUser(req.user.sub);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() body: Partial<PaymentMethod>,
  ) {
    return this.svc.updateForUser(req.user.sub, id, body);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.svc.removeForUser(req.user.sub, id);
  }
}
