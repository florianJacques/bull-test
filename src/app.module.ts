import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { SchedulerModule } from './scheduler/schelduler.module';


@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        password: 'root',
        db: 2,
      }
    }),
    ScheduleModule.forRoot(),
    SchedulerModule
    ],
})
export class AppModule {}
