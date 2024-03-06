import * as Sentry from '@sentry/node'
import type { Express } from 'express'
import config from '@app/config'

const SENTRY_DSN = process.env.SENTRY_DSN

export const SentryApp = (app: Express) => {
  Sentry.init({
    dsn: SENTRY_DSN,
    release: config.app.VERSION,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({
        app,
      }),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  })
  const InitSentry = () => {
    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.tracingHandler())
  }
  const SentryHandler = () => {
    app.use(Sentry.Handlers.errorHandler())
  }
  return { InitSentry, SentryHandler }
}