import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from './profile/profile.entity';
import { Account } from './accounts/account.entity';
import { PaymentMethod } from './payment-method/payment-method.entity';
import { Transaction } from './transactions/transactions.entity';
import { TransactionGroup } from './transaction-group/transaction-group.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false, type: 'varchar' })
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @Column({ default: true })
  @ApiProperty({ example: true })
  active: boolean;

  @Column({ default: false })
  @ApiProperty({ example: false })
  admin: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2023-01-02T00:00:00Z' })
  updatedAt: Date;

  @OneToOne(() => Profile, profile => profile.user, {
    cascade: true,
    eager: false,
  })
  profile?: Profile;

  @OneToMany(() => Account, account => account.owner)
  accounts?: Account[];

  @OneToMany(() => PaymentMethod, pm => pm.user)
  paymentMethods?: PaymentMethod[];

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions?: Transaction[];

  @OneToMany(() => TransactionGroup, group => group.user)
  transactionGroups?: TransactionGroup[];
}
