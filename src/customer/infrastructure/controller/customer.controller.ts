import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Logger,
  ParseUUIDPipe,
  Get,
  Delete,
} from '@nestjs/common'
import { CustomerService } from '../../application/customer.service'
import { CreateCustomerDto } from '../../domain/dto/create-customer.dto'
import { CustomerDto } from '../../domain/dto/customer.dto'
import { UpdateCustomerDto } from '../../domain/dto/update-customer.dto'

@Controller('customers')
export class CustomerController {
  private logger = new Logger('CustomersController')

  constructor(
    private customerService: CustomerService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDto> {

    const { ...customer } = await this.customerService.createCustomer(
      createCustomerDto,
    )
    return { ...customer }
  }
  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateCustomer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    return this.customerService.updateCustomer(
      id,
      updateCustomerDto
    )
  }
  @Get()
  async getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers()
  }

  @Get('/:id')
  getCustomerById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerDto> {
    return this.customerService.getCustomerById(id)
  }

  @Delete('/:id')
  deleteCustomer(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.customerService.deleteCustomer(id)
  }
}
