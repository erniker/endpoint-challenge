import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Logger
} from '@nestjs/common'

import { OrderService } from '../../../order/application/order.service'
import { CreateOrderDto } from '../../domain/dto/create-order.dto'
import { OrderDto } from '../../../commons/dto/order.dto'


@Controller('orders')
export class OrdersController {
    private logger = new Logger('OrdersController')

    constructor(
        private orderService: OrderService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<OrderDto> { return new OrderDto }
}