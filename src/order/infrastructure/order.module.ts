import { Module } from '@nestjs/common'
import { OrderController } from './controller/order.controller'
import { OrderService } from '../application/order.service'
import { MobileCatalogModule } from 'src/mobileCatalog/infrastructure/mobileCatalog.module'
import { MobileCatalogService } from 'src/mobileCatalog/application/mobileCatalog.service'


@Module({
    controllers: [OrderController],
    providers: [OrderService],
    imports: [MobileCatalogModule],
})
export class OrderModule { }
