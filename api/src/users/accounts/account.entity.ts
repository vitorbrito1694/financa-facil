import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../user.entity';

export enum AccountType {
  CASH = 'CASH',
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CURRENT_ACCOUNT,
  })
  type: AccountType;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  balance: string;

  @Column({ default: 'BRL' })
  currency?: string;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'CASCADE' })
  owner?: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
