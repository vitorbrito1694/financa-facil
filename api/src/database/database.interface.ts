export interface IDatabaseService {
  ping(): Promise<{ ok: boolean; now?: string; error?: string }>;
}

export const DATABASE_SERVICE = 'DATABASE_SERVICE';
