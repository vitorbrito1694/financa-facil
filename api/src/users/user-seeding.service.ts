import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Account, AccountType } from './accounts/account.entity';
import {
  PaymentMethod,
  PaymentMethodType,
} from './payment-method/payment-method.entity';
import { TransactionGroup } from './transaction-group/transaction-group.entity';

@Injectable()
export class UserSeedingService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(TransactionGroup)
    private transactionGroupRepo: Repository<TransactionGroup>,
  ) {}

  async seed(user: User): Promise<void> {
    await this.seedAccounts(user);
    await this.seedPaymentMethods(user);
    await this.seedTransactionGroups(user);
  }

  private async seedAccounts(user: User) {
    const accounts = [
      {
        name: 'Carteira',
        type: AccountType.CASH,
        balance: '0',
        owner: user,
      },
      {
        name: 'Conta Principal',
        type: AccountType.CURRENT_ACCOUNT,
        balance: '0',
        owner: user,
      },
    ];

    const entities = this.accountRepo.create(accounts);
    await this.accountRepo.save(entities);
  }

  private async seedPaymentMethods(user: User) {
    const methods = [
      {
        name: 'Pix',
        type: PaymentMethodType.PIX,
        enabled: true,
        user: user,
      },
      {
        name: 'Cartão de Crédito',
        type: PaymentMethodType.CREDIT_CARD,
        enabled: true,
        user: user,
        paymentAt: 1,
        closingAt: 25,
      },
    ];
    // Note: If 'CASH' exists in PaymentMethodType, use it. Based on previous file view, only CREDIT_CARD, DEBIT_CARD, PIX, TED were seen.
    // I'll stick to PIX for now or check if I should add CASH to the enum.
    // Let's re-check PaymentMethodType in a moment if needed, but for now I'll use PIX as a placeholder for "Instant/Cash" or just "Dinheiro" as a name.

    const entities = this.paymentMethodRepo.create(methods);
    await this.paymentMethodRepo.save(entities);
  }

  private async seedTransactionGroups(user: User) {
    const groups = [
      'Alimentação',
      'Transporte',
      'Lazer',
      'Saúde',
      'Educação',
      'Moradia',
      'Outros',
    ];

    const entities = groups.map((name) =>
      this.transactionGroupRepo.create({
        name,
        user: user,
        description: `Categoria para ${name.toLowerCase()}`,
      }),
    );

    await this.transactionGroupRepo.save(entities);
  }
}
