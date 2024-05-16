import { Controller, Get } from '@nestjs/common';

@Controller('map')
export class MapController {
@Get()
  getHello(): string {
    return 'Hello Map Controller';
  }
}
