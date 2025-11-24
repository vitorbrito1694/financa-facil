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
import { Transaction } from './transactions/transaction.entity';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsController } from './transactions/transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, PaymentMethod, Transaction]),
  ],
  providers: [
    UsersService,
    ProfileService,
    PaymentMethodService,
    TransactionsService,
  ],
  controllers: [
    UsersController,
    ProfileController,
    PaymentMethodController,
    TransactionsController,
  ],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([User, Profile, PaymentMethod, Transaction]),
  ],
})
export class UsersModule {}
