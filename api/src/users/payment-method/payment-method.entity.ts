import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../user.entity';
import { Transaction } from '../transactions/transactions.entity';

export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  TED = 'TED',
}

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Index()
  @Column({ type: 'enum', enum: PaymentMethodType })
  type: PaymentMethodType;

  @Column({ type: 'integer', nullable: true })
  paymentAt?: number;

  @Column({ type: 'integer', nullable: true })
  closingAt?: number;

  @Column({ default: true })
  enabled: boolean;

  @ManyToOne(() => User, user => user.paymentMethods, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.paymentMethod)
  transactions?: Transaction[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
