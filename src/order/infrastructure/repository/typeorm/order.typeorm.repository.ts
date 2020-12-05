import { Repository, EntityRepository } from 'typeorm'
import {
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { Order } from './order.typeorm.entity'
import { OrderRepository } from '../../../domain/repository/order.repository'
import { OrderDto } from '../../../domain/dto/order.dto'
import { CreateOrderDto } from '../../../domain/dto/create-order.dto'
import { UpdateOrderDto } from '../../../domain/dto/update-order.dto'

@EntityRepository(Order)
export class OrderRepositoryTypeorm extends Repository<Order>
  implements OrderRepository {

  async createOrder(
    createOrder: CreateOrderDto,
  ): Promise<OrderDto> {
    try {

      const { customerId, orderMobile, totalPrice } = createOrder

      const order = this.create()

      order.customerId = customerId
      order.orderMobile = orderMobile
      order.totalPrice = totalPrice

      await order.save()

      console.log(order)

      return order

    } catch (error) {
      console.log(error)
      if (error instanceof BadRequestException)
        throw new BadRequestException()

      throw new InternalServerErrorException()
    }
  }

  async updateOrder(
    orderId: string,
    updateOrder: UpdateOrderDto,
  ): Promise<void> {
    try {

      if (!orderId) {
        throw new NotFoundException("Order doesn't exists")
      }

      const { customerId, orderMobile, totalPrice } = updateOrder

      const order = await this.getOrderById(orderId)

      console.log(order)

      order.customerId = customerId
      order.orderMobile = orderMobile
      order.totalPrice = totalPrice

      await order.save()

    } catch (err) {
      console.log(err)
      if (err instanceof NotFoundException)
        throw new NotFoundException("Order doesn't exists")
      if (err instanceof BadRequestException)
        throw new BadRequestException()
      throw new InternalServerErrorException()
    }
  }

  async getOrderById(orderId: string): Promise<Order> {
    const found = await this.findOne({
      where: { id: orderId },
    })

    if (!found) {
      throw new NotFoundException(
        `Order with ID "${orderId}" not found`,
      )
    }
    return found
  }

  async getOrders(): Promise<OrderDto[]> {
    try {
      return await this.find()
    } catch (err) {
      if (err instanceof NotFoundException)
        throw new NotFoundException("Orders doesn't exists")
      if (err instanceof BadRequestException)
        throw new BadRequestException()
      throw new InternalServerErrorException()
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      await this.delete(orderId)
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
