import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import * as faker from 'faker';

@Injectable()
export class SchedulerService {

  private readonly logger = new Logger(SchedulerService.name);

  constructor (
    @InjectQueue('queue-test-flo') private readonly queue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'cron_test',
    timeZone: 'Europe/Paris',
  })
  public handleCron() {
    this.logger.debug('dispatch job_test');
    this.queue.add('job-test', {
      size: faker.datatype.number({
        min: 10,
        max: 100,
      }),
    });
  }
}