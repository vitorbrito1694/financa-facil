import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DATABASE_SERVICE } from './database.interface';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [
    {
      provide: DATABASE_SERVICE,
      useClass: DatabaseService,
    },
  ],
  exports: [DATABASE_SERVICE],
})
export class DatabaseModule {}
