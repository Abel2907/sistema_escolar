import "dotenv/config";
import { defineConfig } from "@prisma/config"; // Corrigido o pacote com @
import { env } from "@prisma/config"; // Importado o helper env

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"), // Mudado de process.env para env()
  },
});