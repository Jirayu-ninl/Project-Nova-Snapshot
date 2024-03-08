import type { INestApplication } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'

const Init = (app: INestApplication<any>) => {
  app.use(cookieParser())
  app.use(compression())
  console.log('Middleware initialized...')
}

export { Init }
