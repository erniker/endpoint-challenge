import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreateCustomerDto {
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

  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string
}