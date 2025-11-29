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
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ example: '3b7d6033-63a9-4669-8ca1-bd83089eb075' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '664c7094-363c-4ad0-a1f8-a7212ea2fd2d' })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiProperty({ example: '34efd581-f495-4012-a971-a2a14008592b' })
  @Column({ type: 'uuid', nullable: false, comment: 'Metodo de pagamento' })
  payment_method_id: string;

  @ApiProperty({ example: 150.0 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Valor da transacao',
  })
  amount: number;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  @Column({ type: 'timestamptz', comment: 'Data da transacao' })
  date: Date;

  @ApiProperty({ example: '2023-10-27T10:00:00Z' })
  @Column({ type: 'timestamptz', comment: 'Data do pagamento' })
  paymentAt: Date;

  @ApiProperty({ enum: TransactionType, example: 'EXPENSE' })
  @Column({ type: 'enum', enum: TransactionType, comment: 'Tipo da transacao' })
  type: TransactionType;

  @ApiProperty({ enum: TransactionFrequency, example: 'FIXED' })
  @Column({
    type: 'enum',
    enum: TransactionFrequency,
    comment: 'Frequencia da transacao',
  })
  frequency: TransactionFrequency;

  @ApiProperty({ enum: TransactionClass, example: 'ESSENTIAL' })
  @Column({
    type: 'enum',
    enum: TransactionClass,
    comment: 'Classe da transacao',
  })
  class: TransactionClass;

  @ApiProperty({ example: 'Grocery shopping', nullable: true })
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'int',
    default: 1,
    nullable: false,
    comment: 'Quantidade de parcelas',
  })
  installmentCount: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'int',
    default: 1,
    nullable: false,
    comment: 'Numero da parcela',
  })
  installmentNumber: number;

  @ApiProperty({ example: false })
  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    comment: 'Se a transacao for apenas um apontamento',
  })
  note: boolean;

  @ManyToOne(() => User, user => user.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PaymentMethod, pm => pm.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
