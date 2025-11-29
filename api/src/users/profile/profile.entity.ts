import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('profiles')
export class Profile {
  @ApiProperty({ example: 'uuid-do-perfil' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ example: 'Vitor', nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @ApiProperty({ example: 'https://example.com/avatar.png', nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;

  @ApiProperty({ example: 'Olá, eu sou o Vitor Araujo!', nullable: true })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
