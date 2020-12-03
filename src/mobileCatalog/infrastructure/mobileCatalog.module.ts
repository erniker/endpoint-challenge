import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../../config/database.provider'
import { MobileCatalogProviders } from './mobileCatalog.provider'
import { MobileCatalogController } from './controller/mobileCatalog.controller'
import { MobileCatalogService } from '../application/mobileCatalog.service'

@Module({
    controllers: [MobileCatalogController],
    providers: [MobileCatalogService, ...DatabaseProviders, ...MobileCatalogProviders],
})
export class MobileCatalogModule { }
