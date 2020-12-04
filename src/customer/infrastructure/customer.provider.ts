import { Connection } from 'typeorm'
import { CUSTOMER_REPOSITORY } from '../domain/repository/customer.repository'
import { CustomerRepositoryTypeorm } from './repository/typeorm/customer.typeorm.repository'

export const CustomerProviders = [
  {
    provide: CUSTOMER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(CustomerRepositoryTypeorm),
    inject: ['DATABASE_CONNECTION'],
  },
]
