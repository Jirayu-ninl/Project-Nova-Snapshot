import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { Sentry } from '@app/integrations'
import { Middleware } from '@app/middleware'

import { AppModule } from './app.module'

async function bootstrap() {
  Sentry.Init()
  const app = await NestFactory.create(AppModule)
  Middleware.Init(app)
  app.useGlobalPipes(new ValidationPipe())
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new Sentry.Filter(httpAdapter))
  await app.listen(process.env.PORT || 3000, '0.0.0.0')
  console.log('Environment:', process.env.NODE_ENV)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`)
}
bootstrap()
