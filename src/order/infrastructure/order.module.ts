import { Module } from '@nestjs/common'
import { OrdersController } from './controller/order.controller'
import { OrderService } from '../application/order.service'

@Module({
    controllers: [OrdersController],
    providers: [OrderService],
})
export class OrderModule { }
