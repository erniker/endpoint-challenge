import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class UpdateMobileCatalogDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string

    @ApiProperty()
    @IsString()
    @MaxLength(25)
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmpty()
    price: number
}