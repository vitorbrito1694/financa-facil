import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UsersService } from '../users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  async updateProfile(userId: string, data: Partial<Profile>) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    let profile = await this.profileRepo.findOne({
      where: { user: { id: userId } } as any,
    });
    if (!profile) {
      profile = this.profileRepo.create();
      Object.assign(profile, data);
      profile.user = { id: userId } as any;
    } else {
      Object.assign(profile, data);
    }
    return this.profileRepo.save(profile);
  }

  async findOne(userId: string) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: userId } } as any,
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
