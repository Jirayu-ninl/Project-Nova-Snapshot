import * as Sentry from '@sentry/node'
import { prisma } from '@database/prisma'
import config from '@app/config'

const Init = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: config.app.VERSION,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      Sentry.anrIntegration({ captureStackTrace: true }),
      new Sentry.Integrations.Apollo({ useNestjs: true }),
      new Sentry.Integrations.Prisma({ client: prisma }),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  })
  console.log('Sentry initialized...')
}

export { Init }
