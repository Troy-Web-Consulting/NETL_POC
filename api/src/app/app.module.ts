import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapController } from './controllers/map.controller'

@Module({
  imports: [],
  controllers: [AppController, MapController],
  providers: [AppService],
})
export class AppModule {}
