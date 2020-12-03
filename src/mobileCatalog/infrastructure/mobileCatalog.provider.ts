import { Connection } from 'typeorm'
import { MOBILE_CATALOG_REPOSITORY } from '../domain/repository/mobileCatalog.repository'
import { MobileCatalogRepositoryTypeorm } from './repository/typeorm/mobileCatalog.typeorm.repository'

export const MobileCatalogProviders = [
    {
        provide: MOBILE_CATALOG_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getCustomRepository(MobileCatalogRepositoryTypeorm),
        inject: ['DATABASE_CONNECTION'],
    },
]
