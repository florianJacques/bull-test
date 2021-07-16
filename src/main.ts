import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Récupérer la queue (C'est pute mais ça fonctionne)
  const queueTestFlo = app.get<Queue>(getQueueToken('queue-test-flo'));

  //O n créé le board, et je récupère juste le router Express
  const { router: bullRouter } = createBullBoard([
    new BullAdapter(queueTestFlo),
  ]);

  // J'add la route et en avant
  app.use('/test-dashboard', bullRouter);
  app.listen(3009);
}

bootstrap();
