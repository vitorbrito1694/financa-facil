import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transactions.entity';
import {
  PaymentMethod,
  PaymentMethodType,
} from '../payment-method/payment-method.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const {
      installmentCount,
      payment_method_id,
      date,
      paymentAt,
      amount,
      ...restOfDto
    } = createTransactionDto;

    let transactionDate = new Date(date);

    if (payment_method_id) {
      const paymentMethod = await this.paymentMethodRepository.findOne({
        where: { id: payment_method_id },
      });

      if (!paymentMethod) {
        throw new NotFoundException(
          `Payment method with ID ${payment_method_id} not found.`,
        );
      }

      if (
        installmentCount &&
        installmentCount > 1 &&
        paymentMethod.type !== PaymentMethodType.CREDIT_CARD &&
        paymentMethod.type !== PaymentMethodType.PIX
      ) {
        throw new NotFoundException(
          'Installments are only allowed for Credit Card and PIX payment methods.',
        );
      }

      if (
        paymentMethod &&
        paymentMethod.type === PaymentMethodType.CREDIT_CARD &&
        paymentMethod.closingAt &&
        paymentMethod.paymentAt
      ) {
        const closingDay = paymentMethod.closingAt;
        const paymentDay = paymentMethod.paymentAt;
        const transactionDay = transactionDate.getUTCDate();

        if (transactionDay > closingDay && closingDay > paymentDay) {
          transactionDate.setUTCMonth(transactionDate.getUTCMonth() + 2);
        }
        if (transactionDay > closingDay && closingDay < paymentDay) {
          transactionDate.setUTCMonth(transactionDate.getUTCMonth() + 1);
        }
        if (transactionDay <= closingDay && closingDay > paymentDay) {
          transactionDate.setUTCMonth(transactionDate.getUTCMonth() + 1);
        }

        transactionDate.setUTCDate(paymentDay);
      }
    }

    if (installmentCount && installmentCount > 1) {
      const transactionsToSave: Transaction[] = [];
      for (let i = 1; i <= installmentCount; i++) {
        const installmentDate = new Date(transactionDate);
        installmentDate.setUTCMonth(installmentDate.getUTCMonth() + (i - 1));

        transactionsToSave.push(
          this.transactionRepository.create({
            ...restOfDto,
            date,
            payment_method_id,
            paymentAt: installmentDate,
            user_id: userId,
            installmentNumber: i,
            installmentCount,
            amount: amount / installmentCount,
          }),
        );
      }
      return this.transactionRepository.save(transactionsToSave);
    } else {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        date,
        payment_method_id,
        paymentAt: transactionDate,
        user_id: userId,
        installmentNumber: 1,
        installmentCount: 1,
      });
      return this.transactionRepository.save(transaction);
    }
  }

  async findAll(userId: string) {
    return this.transactionRepository.find({
      where: { user_id: userId },
      relations: ['paymentMethod'],
      order: { date: 'DESC' },
    });
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.transactionRepository.findOne({
      where: { id, user_id: userId },
      relations: ['paymentMethod'],
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.findOne(userId, id);
    this.transactionRepository.merge(transaction, updateTransactionDto);
    return this.transactionRepository.save(transaction);
  }

  async remove(userId: string, id: string) {
    const transaction = await this.findOne(userId, id);
    return this.transactionRepository.remove(transaction);
  }
}
