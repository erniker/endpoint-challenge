import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import {
    ORDER_REPOSITORY,
    OrderRepository,
} from '../domain/repository/order.repository'
import { CreateOrderDto } from '../domain/dto/create-order.dto'
// import { UpdatePrepareOrderDto } from '../domain/dto/update-prepare-order.dto'
import { PrepareOrderDto } from '../domain/dto/prepare-order.dto'
// import { UpdateOrderDto } from '../domain/dto/update-order.dto'
import { OrderDto } from '../domain/dto/order.dto'
import { MobileCatalogService } from '../../mobileCatalog/application/mobileCatalog.service'
import { MobileCatalogDto } from './../../commons/dto/mobileCatalog.dto'

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: OrderRepository,
        private mobileCatalogService: MobileCatalogService,
    ) { }

    async createOrder(prepareOrder: PrepareOrderDto): Promise<OrderDto> {

        const { customerId, mobileIds } = prepareOrder

        // Get order Mobiles
        const mobiles: MobileCatalogDto[] = await this.getOrderMobiles(mobileIds)

        // To create de orderMobile object
        const orderMobile = this.createOrderMobileObject(mobiles)

        // Check if there is any inconsistense with the mobile in the catalog
        if (!this.checkOrderIntegrity(mobileIds, mobiles)) {
            throw new NotFoundException("Any mobile selected doesn't exists")
        }

        // Calculate final price from catalog
        const totalPrice = await this.calculateFinalPrice(mobileIds, mobiles)

        const createdOrder: CreateOrderDto = {
            customerId: customerId,
            orderMobile: orderMobile,
            totalPrice: totalPrice
        }
        return this.orderRepository.createOrder(createdOrder)
    }

    // async updateOrder(
    //     orderId: string,
    //     updatePrepareOrder: UpdatePrepareOrderDto,
    // ): Promise<void> {

    //     const { customerId, mobileIds } = updatePrepareOrder

    //     // Get order Mobiles 
    //     const mobiles: MobileCatalogDto[] = await this.getOrderMobiles(mobileIds)

    //     const orderMobile = this.updatwOrderMobileObject(orderId, mobiles)

    //     // Check if there is any inconsistense with the mobile in the catalog
    //     if (!this.checkOrderIntegrity(mobileIds, mobiles)) {
    //         throw new NotFoundException("Any mobile selected doesn't exists")
    //     }

    //     // Calculate final price from catalog
    //     const totalPrice = await this.calculateFinalPrice(mobileIds, mobiles)

    //     const updateOrder: UpdateOrderDto = {
    //         customerId: customerId,
    //         orderMobile: orderMobile,
    //         totalPrice: totalPrice
    //     }
    //     return this.orderRepository.updateOrder(orderId, updateOrder)
    // }

    async getOrders(): Promise<OrderDto[]> {
        return this.orderRepository.getOrders()
    }

    async getOrderById(orderId: string): Promise<OrderDto> {
        return this.orderRepository.getOrderById(orderId)
    }

    async deleteOrder(orderId: string): Promise<void> {
        return this.orderRepository.deleteOrder(orderId)
    }


    async getOrderMobiles(mobileIds: string[]): Promise<MobileCatalogDto[]> {
        const uniqueMobiles: MobileCatalogDto[] = await this.mobileCatalogService.getMobileByIds(mobileIds)

        const orderMobile: MobileCatalogDto[] = []
        for (let i = 0; i < mobileIds.length; i++) {
            const found: MobileCatalogDto = uniqueMobiles.find(mobile => mobile.id == mobileIds[i])
            orderMobile.push(found)
        }
        return orderMobile

    }


    checkOrderIntegrity(mobileIds: string[], mobiles: MobileCatalogDto[]): boolean {
        // const uniqueMobileIds = [...new Set(mobileIds)]
        // return uniqueMobileIds.length === mobiles.length
        return mobileIds.length === mobiles.length
    }

    calculateFinalPrice(mobileIds: string[], mobiles: MobileCatalogDto[]): number {
        return mobiles.reduce((total, mobile) => {
            total = total + (mobile.price)
            return total
        }, 0)


        // const mobileConcurrencies = mobileIds.reduce((acc, id) => {
        //     if (typeof acc[id] == 'undefined') {
        //         acc[id] = 1;
        //     } else {
        //         acc[id] += 1;
        //     }
        //     return acc;
        //     // acc[id] = acc[id] ? acc[id]++ : 1
        //     // return acc
        // }, {})

        // return mobiles.reduce((total, mobile) => {
        //     total = total + (mobile.price * mobileConcurrencies[mobile.id])
        //     return total
        // }, 0)

    }

    createOrderMobileObject(mobiles: MobileCatalogDto[]): any {

        const orderMobile = []
        for (let i = 0; i < mobiles.length; i++) {
            const mobile = {
                mobileId: mobiles[i].id,
                price: mobiles[i].price
            }

            orderMobile.push(mobile)
        }
        return orderMobile
    }

    updatwOrderMobileObject(orderId: string, mobiles: MobileCatalogDto[]): any {

        const orderMobile = []
        for (let i = 0; i < mobiles.length; i++) {
            const mobile = {
                orderId: orderId,
                mobileId: mobiles[i].id,
                price: mobiles[i].price
            }

            orderMobile.push(mobile)
        }
        return orderMobile
    }
}