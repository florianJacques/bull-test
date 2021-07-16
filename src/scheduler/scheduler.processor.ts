import { OnQueueActive, OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('queue-test-flo')
export class SchedulerProcessor {
  private readonly logger = new Logger(SchedulerProcessor.name);

  @OnQueueActive()
  public onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with size ${job.data.size}...`,
    );
  }

  @OnQueueProgress()
  public onProgress(job: Job, progress: number) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} progress ${progress} %`,
    );
  }

  @Process('job-test')
  public async handleJobTest(job: Job) {
    const {size} = job.data;

    return await new Promise<any>((resolve) => {
      let traited = 0;

      const interval = setInterval(() => {

        traited ++;
        const progress = Math.round((traited / size) * 100);
        job.progress(progress);

        if (traited >= size) {
          clearInterval(interval);
          resolve({
            traited: traited,
          });
        }

      }, 1000);
    });
  }
}