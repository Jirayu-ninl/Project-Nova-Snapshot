import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log:
//       env.NODE_ENV === 'development'
//         ? ['query', 'error', 'warn']
//         : ['error']
//   }).$extends(withAccelerate())

// if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const prisma = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error']
  }).$extends(withAccelerate())

export { prisma }
