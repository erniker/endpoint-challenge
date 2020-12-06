import {
    Controller,
    Post,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    Logger,
    ParseUUIDPipe,
    Get,
    Delete,
} from '@nestjs/common'
import { PrepareOrderDto, } from '../../domain/dto/prepare-order.dto'
import { OrderService } from '../../application/order.service'
import { OrderDto } from '../../domain/dto/order.dto'

@Controller('orders')
export class OrderController {
    private logger = new Logger('OrdersController')

    constructor(
        private orderService: OrderService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() prepareOrderDto: PrepareOrderDto,
    ): Promise<OrderDto> {
        const order = await this.orderService.createOrder(prepareOrderDto)
        console.log(order)
        return order
    }

    @Get()
    async getOrders(): Promise<OrderDto[]> {
        return this.orderService.getOrders()
    }

    @Get('/:id')
    getOrderById(
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<OrderDto> {
        return this.orderService.getOrderById(id)
    }

    @Delete('/:id')
    deleteOrder(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        return this.orderService.deleteOrder(id)
    }
}