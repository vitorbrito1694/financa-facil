import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IDatabaseService } from './database.interface';

@Injectable()
export class DatabaseService implements IDatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  async ping(): Promise<{ ok: boolean; now?: string; error?: string }> {
    try {
      const res = await this.dataSource.query('SELECT NOW()');
      const now = Array.isArray(res) && res[0] && (res[0].now ?? res[0].NOW);
      return { ok: true, now: String(now) };
    } catch (err: any) {
      return { ok: false, error: err?.message ?? String(err) };
    }
  }
}
