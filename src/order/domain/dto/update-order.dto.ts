import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { OrderMobileDto } from './orderMobile.dto'

export class UpdateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    customerId: string

    @ApiProperty()
    @IsNotEmpty()
    orderMobile: any[]

    @ApiProperty()
    @IsNotEmpty()
    totalPrice: number
}