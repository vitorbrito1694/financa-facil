import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(EmailService.name);

  constructor() {
    const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const opts: any = {
      host,
      port,
      secure: port === 465,
    };
    if (user) opts.auth = { user, pass };

    this.transporter = nodemailer.createTransport(opts);
  }

  async sendVerificationCode(to: string, code: string) {
    const from = process.env.EMAIL_FROM;
    const subject = 'Seu código de acesso';
    const text = `Seu código de acesso é: ${code}. Valido por alguns minutos.`;

    try {
      await this.transporter.sendMail({ from, to, subject, text });
      this.logger.log(`Verification code sent to ${to}`);
    } catch (err) {
      this.logger.error('Failed to send verification email', err as any);
      throw err;
    }
  }
}
