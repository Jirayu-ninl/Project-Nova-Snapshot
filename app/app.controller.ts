import { Controller, Get, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { ROUTES } from '@routes'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(ROUTES.root)
  root(@Res() response: Response): void {
    return this.appService.root(response)
  }

  @Get(ROUTES.hello)
  hello(): string {
    return this.appService.hello()
  }

  @Get(ROUTES.debug.sentry)
  debugSentry(): void {
    return this.appService.debugSentry()
  }
}
