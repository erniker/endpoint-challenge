import { OrderMobileDto } from './orderMobile.dto'

export class OrderDto {
    id: string
    customerId: string
    orderMobile: any[]
    totalPrice: number
    createdAt: string
    updatedAt: string
}