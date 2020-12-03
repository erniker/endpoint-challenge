import { Injectable, Inject } from '@nestjs/common'
import { CreateOrderDto } from '../domain/dto/create-order.dto'
import { OrderDto } from '../../commons/dto/order.dto'

@Injectable()
export class OrderService {
    constructor() { }
}
