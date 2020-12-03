import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { MobileCatalog } from 'src/mobileCatalog/infrastructure/repository/typeorm/mobileCatalog.typeorm.entity'

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    surname: string

    @ApiProperty()
    @MaxLength(35)
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    cart: MobileCatalog[]

}