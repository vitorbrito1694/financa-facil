import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from './profile/profile.entity';
import { PaymentMethod } from './payment-method/payment-method.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfileController } from './profile/profile.controller';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, PaymentMethod])],
  providers: [UsersService, ProfileService, PaymentMethodService],
  controllers: [UsersController, ProfileController, PaymentMethodController],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([User, Profile, PaymentMethod]),
  ],
})
export class UsersModule {}
