import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from './profile/profile.entity';

@Injectable()
export class UsersService {
  updateProfile(id: string, body: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepo: Repository<Profile>,
  ) {}

  findOne(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['profile', 'accounts', 'paymentMethods'],
    });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      relations: ['profile', 'accounts', 'paymentMethods'],
    });
  }

  createIfNotExists(email: string) {
    return this.findByEmail(email).then((u) => {
      if (u) return u;
      const ent = this.usersRepo.create({ email });
      return this.usersRepo.save(ent);
    });
  }

  setActive(userId: string, active: boolean) {
    return this.usersRepo.update(userId, { active });
  }

  setAdmin(userId: string, admin: boolean) {
    return this.usersRepo.update(userId, { admin });
  }
}
