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
// import { UpdatePrepareOrderDto } from '../../domain/dto/update-prepare-order.dto'
import { PrepareOrderDto, } from '../../domain/dto/prepare-order.dto'
import { OrderService } from '../../application/order.service'
// import { CreateOrderDto } from '../../domain/dto/create-order.dto'
import { OrderDto } from '../../domain/dto/order.dto'
// import { UpdateOrderDto } from '../../domain/dto/update-order.dto'

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
        const order = this.orderService.createOrder(prepareOrderDto)
        console.log(order)
        return order
    }

    // @Put('/:id')
    // @UsePipes(ValidationPipe)
    // updateOrder(
    //     @Param('id', ParseUUIDPipe) id: string,
    //     @Body()
    //     UpdatePrepareOrderDto: UpdatePrepareOrderDto): Promise<void> {
    //     return this.orderService.updateOrder(id, UpdatePrepareOrderDto)
    // }

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