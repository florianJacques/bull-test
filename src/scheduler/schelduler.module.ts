import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { SchedulerService } from './schedule.service';
import { SchedulerProcessor } from './scheduler.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'queue-test-flo',
    }),
  ],
  providers: [
    SchedulerService,
    SchedulerProcessor,
  ],
})
export class SchedulerModule {}
