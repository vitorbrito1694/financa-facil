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

  findAll(userId: string) {
    return this.accountRepo.find({ where: { owner: { id: userId } } });
  }

  findOne(id: string, userId: string) {
    return this.accountRepo.findOne({ where: { id, owner: { id: userId } } });
  }

  async remove(id: string, userId: string) {
    const result = await this.accountRepo.delete({ id, owner: { id: userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return { ok: true };
  }
}
