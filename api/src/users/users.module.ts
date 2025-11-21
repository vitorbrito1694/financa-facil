import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile/profile.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService],
  controllers: [UsersController, ProfileController],
  exports: [UsersService, TypeOrmModule.forFeature([User, Profile])],
})
export class UsersModule {}
