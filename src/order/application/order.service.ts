import { Injectable, Inject } from '@nestjs/common'
import {
    ORDER_REPOSITORY,
    OrderRepository,
} from '../domain/repository/order.repository'
import { CreateOrderDto } from '../domain/dto/create-order.dto'
import { UpdateOrderDto } from '../domain/dto/update-order.dto'
import { OrderDto } from '../domain/dto/order.dto'
import { MobileCatalogService } from '../../mobileCatalog/application/mobileCatalog.service'
import { MobileCatalogDto } from 'src/commons/dto/mobileCatalog.dto'

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: OrderRepository,
        private mobileCatalogService: MobileCatalogService,
    ) { }

    async createOrder(createOrder: CreateOrderDto): Promise<OrderDto> {

        const { customerId, orderMobile } = createOrder

        // Calculate Final price from catalog
        const totalPrice = await this.calculateFinalPrice(orderMobile)

        const createdOrder: CreateOrderDto = {
            customerId: customerId,
            orderMobile: orderMobile,
            totalPrice: totalPrice
        }
        return this.orderRepository.createOrder(createdOrder)
    }

    // Use with caution
    async updateOrder(
        orderId: string,
        updateCostumer: UpdateOrderDto,
    ): Promise<void> {
        return this.orderRepository.updateOrder(
            orderId,
            updateCostumer,
        )
    }

    async getOrders(): Promise<OrderDto[]> {
        return this.orderRepository.getOrders()
    }

    async getOrderById(orderId: string): Promise<OrderDto> {
        return this.orderRepository.getOrderById(orderId)
    }

    async deleteOrder(orderId: string): Promise<void> {
        return this.orderRepository.deleteOrder(orderId)
    }


    async calculateFinalPrice(mobileIds: string[]): Promise<number> {
        let totalPrice = 0

        for (let i = 0; i < mobileIds.length; i++) {
            // Get mobileInfo from Catalog
            const mobile: MobileCatalogDto = await this.mobileCatalogService.getMobileById(mobileIds[i])

            totalPrice = totalPrice + mobile.price
        }
        return totalPrice
    }
}
