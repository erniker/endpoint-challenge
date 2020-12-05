import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
//import { OrderMobileDto } from './orderMobile.dto'
export class PrepareOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    customerId: string

    @ApiProperty()
    @IsNotEmpty()
    mobileIds: string[]

}