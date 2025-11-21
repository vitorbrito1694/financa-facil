import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from './profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepo: Repository<Profile>,
  ) {}

  findOne(id: string) {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['profile', 'accounts'],
    });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      relations: ['profile', 'accounts'],
    });
  }

  createIfNotExists(email: string) {
    return this.findByEmail(email).then((u) => {
      if (u) return u;
      const ent = this.usersRepo.create({ email });
      return this.usersRepo.save(ent);
    });
  }

  async updateProfile(userId: string, data: Partial<Profile>) {
    const user = await this.findOne(userId);
    if (!user) return null;
    let profile = await this.profilesRepo.findOne({
      where: { user: { id: userId } } as any,
    });
    if (!profile) {
      profile = this.profilesRepo.create();
      Object.assign(profile, data);
      profile.user = user;
    } else {
      Object.assign(profile, data);
    }
    return this.profilesRepo.save(profile);
  }

  setActive(userId: string, active: boolean) {
    return this.usersRepo.update(userId, { active });
  }

  setAdmin(userId: string, admin: boolean) {
    return this.usersRepo.update(userId, { admin });
  }
}
