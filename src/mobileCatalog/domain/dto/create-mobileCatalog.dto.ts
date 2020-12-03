import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateMobileCatalogDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    price: number
}