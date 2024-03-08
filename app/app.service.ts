import { Injectable, Res } from '@nestjs/common'
import type { Response } from 'express'

@Injectable()
export class AppService {
  root(@Res() response: Response): void {
    response.status(200).json({
      name: 'TheIceJi NOVA',
      env: process.env.NODE_ENV,
      status: true,
      running: true,
    })
  }
  hello(): string {
    return 'Hello from TheIceJi Server (NOVA APP)'
  }
  debugSentry(): void {
    throw new Error('Debug: Throw error from TheIceJi-NOVA')
  }
}
