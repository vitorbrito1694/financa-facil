import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private repo: Repository<PaymentMethod>,
  ) {}

  createForUser(userId: string, data: Partial<PaymentMethod>) {
    const ent = this.repo.create({ ...data, user: { id: userId } as any });
    return this.repo.save(ent);
  }

  findAllForUser(userId: string) {
    return this.repo.find({ where: { user: { id: userId } as any } });
  }

  findOneForUser(userId: string, id: string) {
    return this.repo.findOne({ where: { id, user: { id: userId } as any } });
  }

  async updateForUser(
    userId: string,
    id: string,
    data: Partial<PaymentMethod>,
  ) {
    const pm = await this.findOneForUser(userId, id);
    if (!pm) throw new NotFoundException('Payment method not found');
    Object.assign(pm, data);
    return this.repo.save(pm);
  }

  async removeForUser(userId: string, id: string) {
    const pm = await this.findOneForUser(userId, id);
    if (!pm) throw new NotFoundException('Payment method not found');
    await this.repo.delete(id);
    return { ok: true };
  }
}
