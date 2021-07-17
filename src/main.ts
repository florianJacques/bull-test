import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // Récupérer la queue (C'est pute mais ça fonctionne)
  const queueTestFlo = app.get<Queue>(getQueueToken('queue-test-flo'));

  //On créé le board, et je récupère juste le router Express
  const serverAdapter = new ExpressAdapter();
  const board = createBullBoard({
    queues: [
      new BullAdapter(queueTestFlo),
    ],
    serverAdapter: serverAdapter,
  });
  
  // J'add la route et en avant
  serverAdapter.setBasePath('/bull');
  app.use('/bull', serverAdapter.getRouter());
  app.listen(3009);
}

bootstrap();
