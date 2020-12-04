import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../../config/database.provider'
import { OrderController } from './controller/order.controller'
import { OrderService } from '../application/order.service'
import { OrderProviders } from './order.provider'
import { MobileCatalogModule } from 'src/mobileCatalog/infrastructure/mobileCatalog.module'
// import { MobileCatalogService } from 'src/mobileCatalog/application/mobileCatalog.service'


@Module({
    controllers: [OrderController],
    providers: [OrderService, ...DatabaseProviders, ...OrderProviders],
    imports: [MobileCatalogModule],
})
export class OrderModule { }
