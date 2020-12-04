import {
    Controller,
    Post,
    Put,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
    Logger,
    ParseUUIDPipe,
    Get,
    Delete,
} from '@nestjs/common'
import { OrderService } from '../../application/order.service'
import { CreateOrderDto } from '../../domain/dto/create-order.dto'
import { OrderDto } from '../../domain/dto/order.dto'
import { UpdateOrderDto } from '../../domain/dto/update-order.dto'

@Controller('orders')
export class OrderController {
    private logger = new Logger('OrdersController')

    constructor(
        private orderService: OrderService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
    ): Promise<OrderDto> {
        const order = await this.orderService.createOrder(createOrderDto)
        console.log(order)
        return order
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateOrder(
        @Param('id', ParseUUIDPipe) id: string,
        @Body()
        updateOrderDto: UpdateOrderDto): Promise<void> {
        return this.orderService.updateOrder(id, updateOrderDto)
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