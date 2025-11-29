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
import { ApiProperty } from '@nestjs/swagger';

export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  TED = 'TED',
}

@Entity('payment_methods')
export class PaymentMethod {
  @ApiProperty({ example: 'b23588bd-8295-4944-9d16-ffa434c0e921' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Itaú' })
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Index()
  @ApiProperty({ enum: PaymentMethodType, example: 'TED' })
  @Column({ type: 'enum', enum: PaymentMethodType })
  type: PaymentMethodType;

  @ApiProperty({ example: null, nullable: true })
  @Column({ type: 'integer', nullable: true })
  paymentAt?: number;

  @ApiProperty({ example: null, nullable: true })
  @Column({ type: 'integer', nullable: true })
  closingAt?: number;

  @ApiProperty({ example: true })
  @Column({ default: true })
  enabled: boolean;

  @ManyToOne(() => User, user => user.paymentMethods, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Transaction, transaction => transaction.paymentMethod)
  transactions?: Transaction[];

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
