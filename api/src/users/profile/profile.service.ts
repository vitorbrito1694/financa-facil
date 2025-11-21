import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepo: Repository<Profile>,
  ) {}

  async updateProfile(userId: string, data: Partial<Profile>) {
    const user = { id: userId } as any;
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
}
