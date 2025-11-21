import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { User } from '../user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(data: Partial<Account>) {
    const userId = (data.owner as any)?.id;
    if (userId) {
      const user = await this.usersRepo.findOne({ where: { id: userId } });
      if (!user)
        throw new NotFoundException(`User with id ${userId} not found`);
    }
    const name = (data as any)?.name;
    if (userId && name) {
      const existing = await this.accountRepo.findOne({
        where: { name, owner: { id: userId } as any },
      });
      if (existing)
        throw new ConflictException(
          `Account with name ${name} already exists for user ${userId}`,
        );
    }
    const ent = this.accountRepo.create(data);
    return this.accountRepo.save(ent);
  }

  findAll() {
    return this.accountRepo.find();
  }

  findOne(id: string) {
    return this.accountRepo.findOne({ where: { id } });
  }

  async remove(id: string) {
    await this.accountRepo.delete(id);
    return { ok: true };
  }
}
