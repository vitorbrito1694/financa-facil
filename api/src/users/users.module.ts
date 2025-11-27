import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PaymentMethod } from './payment-method/payment-method.entity';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { Profile } from './profile/profile.entity';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { Transaction } from './transactions/transaction.entity';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsController } from './transactions/transactions.controller';
import { Account } from './accounts/account.entity';
import { AccountsService } from './accounts/accounts.service';
import { AccountsController } from './accounts/accounts.controller';
import { JwtModule } from '@nestjs/jwt';
import { TransactionGroup } from './transaction-group/transaction-group.entity';
import { TransactionGroupService } from './transaction-group/transaction-group.service';
import { TransactionGroupController } from './transaction-group/transaction-group.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, PaymentMethod, Transaction, TransactionGroup, Account]),
    JwtModule
  ],
  providers: [
    ProfileService,
    PaymentMethodService,
    TransactionsService,
    TransactionGroupService,
    AccountsService,
    UsersService,
  ],
  controllers: [
    ProfileController,
    PaymentMethodController,
    TransactionsController,
    TransactionGroupController,
    AccountsController,
    UsersController,
  ],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([User, Profile, PaymentMethod, Transaction, TransactionGroup, Account]),
  ],
})
export class UsersModule {}
