import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { OrderService } from '../../../order/application/order.service'
import { CreateOrderDto } from '../../domain/dto/create-order.dto'
import { OrderDto } from '../../../commons/dto/order.dto'


@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post('calculateCart')
    @UsePipes(ValidationPipe)
    async calculateCart(@Body() createOrder: CreateOrderDto): Promise<OrderDto> { return new OrderDto }
}