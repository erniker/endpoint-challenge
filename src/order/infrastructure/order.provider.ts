import { Connection } from 'typeorm'
import { ORDER_REPOSITORY } from '../domain/repository/order.repository'
import { OrderRepositoryTypeorm } from './repository/typeorm/order.typeorm.repository'

export const OrderProviders = [
  {
    provide: ORDER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OrderRepositoryTypeorm),
    inject: ['DATABASE_CONNECTION'],
  },
]
