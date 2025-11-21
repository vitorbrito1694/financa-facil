import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  IDatabaseService,
  DATABASE_SERVICE,
} from './database/database.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(DATABASE_SERVICE)
    private readonly databaseService: IDatabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('now')
  async testDbConnection() {
    return this.databaseService.ping();
  }
}
