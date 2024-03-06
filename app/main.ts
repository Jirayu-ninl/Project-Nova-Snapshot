import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import { Sentry } from '@app/integrations'
import { AppModule } from './app.module'

async function bootstrap() {
  Sentry.Init()
  const app = await NestFactory.create(AppModule)
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new Sentry.Filter(httpAdapter))
  await app.listen(3000)
}
bootstrap()
