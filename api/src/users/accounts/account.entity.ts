import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum AccountType {
  CASH = 'CASH',
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

@Entity('accounts')
export class Account {
  @ApiProperty({ example: '939fe4dc-0362-43ea-8c35-94ca45f2f9ec' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ApiProperty({ example: 'Nubank' })
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @ApiProperty({ enum: AccountType, example: 'CURRENT_ACCOUNT' })
  @Column({
    type: 'enum',
    enum: AccountType,
    default: AccountType.CURRENT_ACCOUNT,
  })
  type: AccountType;

  @ApiProperty({ example: 1500.75 })
  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  balance: string;

  @ApiProperty({ example: 'BRL' })
  @Column({ default: 'BRL' })
  currency?: string;

  @ManyToOne(() => User, user => user.accounts, { onDelete: 'CASCADE' })
  owner?: User;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
