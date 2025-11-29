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
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transaction_groups')
export class TransactionGroup {
  @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Groceries' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Monthly grocery expenses', nullable: true })
  @Column({ nullable: true })
  @IsString()
  description: string;

  @ManyToOne(() => User, user => user.transactionGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: '664c7094-363c-4ad0-a1f8-a7212ea2fd2d' })
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
