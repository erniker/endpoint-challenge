import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { OrderDto } from '../dto/order.dto'

export interface OrderRepository {
  createOrder(
    createOrder: CreateOrderDto,
  ): Promise<OrderDto>
  updateOrder(
    orderId: string,
    updateOrder: UpdateOrderDto,
  ): Promise<void>
  getOrders(): Promise<OrderDto[]>

  getOrderById(orderId: string): Promise<OrderDto>

  deleteOrder(orderId: string): Promise<void>
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY'
