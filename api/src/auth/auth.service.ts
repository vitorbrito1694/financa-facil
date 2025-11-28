import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationCode } from './verification-code.entity';
import { User } from '../users/user.entity';
import { UserSeedingService } from '../users/user-seeding.service';
import { EmailService } from './email.service';
import { randomInt } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private codeTtlMs = Number(process.env.CODE_TTL_MS || 10 * 60 * 1000); // default 10 minutes

  constructor(
    @InjectRepository(VerificationCode)
    private codesRepo: Repository<VerificationCode>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private emailService: EmailService,
    private jwtService: JwtService,
    private userSeedingService: UserSeedingService,
  ) {}

  private generateCode(): string {
    return String(randomInt(0, 1_000_000)).padStart(6, '0');
  }

  async sendCode(email: string) {
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + this.codeTtlMs);

    const entity = this.codesRepo.create({ email, code, expiresAt });
    await this.codesRepo.save(entity);

    await this.emailService.sendVerificationCode(email, code);
    return { ok: true };
  }

  async verifyCode(email: string, code: string) {
    const now = new Date();
    const record = await this.codesRepo.findOne({
      where: { email, used: false },
      order: { createdAt: 'DESC' },
    });

    if (!record) throw new BadRequestException('Código inválido ou expirado');
    if (record.expiresAt < now || record.code !== code) {
      throw new BadRequestException('Código inválido ou expirado');
    }

    record.used = true;
    await this.codesRepo.save(record);

    let user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      user = this.usersRepo.create({ email });
      user = await this.usersRepo.save(user);
      await this.userSeedingService.seed(user);
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }
}
