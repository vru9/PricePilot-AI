import path from 'node:path'
import type { PrismaConfig } from 'prisma'
import 'dotenv/config'

export default {
  schema: path.join(__dirname, 'prisma/schema.prisma'),

  migrate: {
    async url() {
      return process.env.DATABASE_URL ?? ''
    },
    async shadowUrl() {
      return process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? ''
    },
  },
} satisfies PrismaConfig
