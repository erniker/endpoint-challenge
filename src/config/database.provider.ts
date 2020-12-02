import * as dotenv from 'dotenv'
import { createConnection, ConnectionOptions } from 'typeorm'

dotenv.config()

const DB_CONFIG: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.DB_SYNC === 'true',
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'migrations',
  },
}

export const dbConfig = DB_CONFIG

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(DB_CONFIG),
  },
]
