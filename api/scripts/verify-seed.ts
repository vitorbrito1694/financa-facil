import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UserSeedingService } from '../src/users/user-seeding.service';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from '../src/users/accounts/account.entity';
import { PaymentMethod } from '../src/users/payment-method/payment-method.entity';
import { TransactionGroup } from '../src/users/transaction-group/transaction-group.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const userSeedingService = app.get(UserSeedingService);
  const usersRepo = app.get<Repository<User>>(getRepositoryToken(User));
  const accountRepo = app.get<Repository<Account>>(getRepositoryToken(Account));
  const pmRepo = app.get<Repository<PaymentMethod>>(
    getRepositoryToken(PaymentMethod),
  );
  const tgRepo = app.get<Repository<TransactionGroup>>(
    getRepositoryToken(TransactionGroup),
  );

  console.log('Creating test user...');
  const email = `test-seed-${Date.now()}@example.com`;
  let user = usersRepo.create({ email, active: true });
  user = await usersRepo.save(user);
  console.log(`User created: ${user.id} (${user.email})`);

  console.log('Seeding data...');
  await userSeedingService.seed(user);
  console.log('Seeding complete.');

  console.log('Verifying data...');
  const accounts = await accountRepo.find({
    where: { owner: { id: user.id } },
  });
  const paymentMethods = await pmRepo.find({
    where: { user: { id: user.id } },
  });
  const transactionGroups = await tgRepo.find({
    where: { user: { id: user.id } },
  });

  console.log(`Accounts: ${accounts.length}`);
  accounts.forEach((a) => console.log(` - ${a.name} (${a.type})`));

  console.log(`Payment Methods: ${paymentMethods.length}`);
  paymentMethods.forEach((pm) => console.log(` - ${pm.name} (${pm.type})`));

  console.log(`Transaction Groups: ${transactionGroups.length}`);
  transactionGroups.forEach((tg) => console.log(` - ${tg.name}`));

  if (
    accounts.length > 0 &&
    paymentMethods.length > 0 &&
    transactionGroups.length > 0
  ) {
    console.log('SUCCESS: Default data seeded correctly.');
  } else {
    console.error('FAILURE: Missing default data.');
    process.exit(1);
  }

  // Cleanup
  console.log('Cleaning up...');
  await usersRepo.remove(user);

  await app.close();
}

bootstrap();
