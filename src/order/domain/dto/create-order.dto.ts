import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
//import { OrderMobileDto } from './orderMobile.dto'
export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    customerId: string

    @ApiProperty()
    @IsNotEmpty()
    orderMobile: any[] //string[]? array de id de mobiles del catalogo

    @ApiProperty()
    @IsNotEmpty()
    totalPrice: number

}