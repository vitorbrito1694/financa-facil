import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { PaymentMethod } from '../payment-method/payment-method.entity';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  INVESTMENT = 'INVESTMENT',
}

export enum TransactionFrequency {
  FIXED = 'FIXED',
  RECURRING = 'RECURRING',
  PROBABLE = 'PROBABLE',
}

export enum TransactionClass {
  ESSENTIAL = 'ESSENTIAL',
  NOT_ESSENTIAL = 'NOT_ESSENTIAL',
  OPTIONAL = 'OPTIONAL',
  SAVING = 'SAVING',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid', nullable: false, comment: 'Metodo de pagamento' })
  payment_method_id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Valor da transacao',
  })
  amount: number;

  @Column({ type: 'timestamptz', comment: 'Data da transacao' })
  date: Date;

  @Column({ type: 'timestamptz', comment: 'Data do pagamento' })
  paymentAt: Date;

  @Column({ type: 'enum', enum: TransactionType, comment: 'Tipo da transacao' })
  type: TransactionType;

  @Column({
    type: 'enum',
    enum: TransactionFrequency,
    comment: 'Frequencia da transacao',
  })
  frequency: TransactionFrequency;

  @Column({
    type: 'enum',
    enum: TransactionClass,
    comment: 'Classe da transacao',
  })
  class: TransactionClass;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({
    type: 'int',
    default: 1,
    nullable: false,
    comment: 'Quantidade de parcelas',
  })
  installmentCount: number;

  @Column({
    type: 'int',
    default: 1,
    nullable: false,
    comment: 'Numero da parcela',
  })
  installmentNumber: number;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    comment: 'Se a transacao for apenas um apontamento',
  })
  note: boolean;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PaymentMethod, (pm) => pm.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
