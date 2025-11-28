import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod, PaymentMethodType } from './payment-method.entity';
import { UsersService } from '../users.service';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    private usersService: UsersService,
  ) {}

  async createForUser(userId: string, data: Partial<PaymentMethod>) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const name = (data as any)?.name;
    const type = (data as any)?.type;

    if (name && type) {
      const existing = await this.paymentMethodRepo.findOne({
        where: { name, type, user: { id: userId } as any },
      });
      if (existing)
        throw new ConflictException(
          `Payment method with name ${name} already exists for user ${userId} with the same type ${type}`,
        );
    }

    if (type === PaymentMethodType.CREDIT_CARD) {
      const paymentAt = (data as any)?.paymentAt;
      const closingAt = (data as any)?.closingAt;
      if (!paymentAt || !closingAt)
        throw new BadRequestException('Payment method with type CREDIT_CARD must have paymentAt and closingAt');
    }

    const ent = this.paymentMethodRepo.create({
      ...data,
      user: { id: userId } as any,
    });
    return this.paymentMethodRepo.save(ent);
  }

  findAllForUser(userId: string) {
    return this.paymentMethodRepo.find({
      where: { user: { id: userId } as any },
    });
  }

  findOneForUser(userId: string, id: string) {
    return this.paymentMethodRepo.findOne({
      where: { id, user: { id: userId } as any },
    });
  }

  async updateForUser(userId: string, id: string, data: Partial<PaymentMethod>) {
    const pm = await this.findOneForUser(userId, id);
    if (!pm) throw new NotFoundException('Payment method not found');
    const newName = (data as any)?.name;
    if (newName && newName !== pm.name) {
      const existing = await this.paymentMethodRepo.findOne({
        where: { name: newName, user: { id: userId } as any },
      });
      if (existing && existing.id !== pm.id)
        throw new ConflictException(`Payment method with name ${newName} already exists for user ${userId}`);
    }

    Object.assign(pm, data);
    return this.paymentMethodRepo.save(pm);
  }

  async removeForUser(userId: string, id: string) {
    const pm = await this.findOneForUser(userId, id);
    if (!pm) throw new NotFoundException('Payment method not found');
    await this.paymentMethodRepo.delete(id);
    return { ok: true };
  }
}
