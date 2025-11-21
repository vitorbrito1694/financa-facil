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
import { Profile } from './profile/profile.entity';
import { Account } from './accounts/account.entity';
import { PaymentMethod } from './payment-method/payment-method.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    eager: false,
  })
  profile?: Profile;

  @OneToMany(() => Account, (account) => account.owner)
  accounts?: Account[];

  @OneToMany(() => PaymentMethod, (pm) => pm.user)
  paymentMethods?: PaymentMethod[];
}
