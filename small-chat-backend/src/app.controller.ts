import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async helloWorld() {
    return 'helloWorld';
  }
}
