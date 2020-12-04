import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from '../domain/dto/create-order.dto'
import { OrderDto } from '../../commons/dto/order.dto'
import { MobileCatalogService } from '../../mobileCatalog/application/mobileCatalog.service'
import { MobileCatalogDto } from 'src/commons/dto/mobileCatalog.dto'

@Injectable()
export class OrderService {
    constructor(
        private mobileCatalogService: MobileCatalogService,
    ) { }

    async checkCart(createOrder: CreateOrderDto): Promise<boolean> {
        const check = true

        createOrder.cart.forEach(pickedMobile => {

            const mobile = this.mobileCatalogService.getMobileById(pickedMobile.id)
            if (!mobile) return false
        });

        return check
    }

    async calculateCart(createOrder: CreateOrderDto): Promise<OrderDto> {

        // Check if all mobile in cart exist on DB
        //const




        return new OrderDto
    }
}
