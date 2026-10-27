import { defineConfig } from '@prisma/config'
import * as dotenv from 'dotenv'

// Força o carregamento do arquivo .env
dotenv.config()

export default defineConfig({
  datasource: {
    // O sinal "!" garante ao TypeScript que a variável existe
    url: process.env.DATABASE_URL!,
  },
  migrate: {
    url: process.env.DATABASE_URL!,
  }
})