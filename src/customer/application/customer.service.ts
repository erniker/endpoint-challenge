import { Injectable, Logger, Inject } from '@nestjs/common'
import {
  CUSTOMER_REPOSITORY,
  CustomerRepository,
} from '../domain/repository/customer.repository'
import { CreateCustomerDto } from '../domain/dto/create-customer.dto'
import { UpdateCustomerDto } from '../domain/dto/update-customer.dto'
import { CustomerDto } from '../domain/dto/customer.dto'

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private customerRepository: CustomerRepository,
  ) { }

  async createCustomer(
    createCustomer: CreateCustomerDto,
  ): Promise<CustomerDto> {
    return this.customerRepository.createCustomer(createCustomer)
  }

  async updateCustomer(
    customerId: string,
    updateCostumer: UpdateCustomerDto,
  ): Promise<void> {
    return this.customerRepository.updateCustomer(
      customerId,
      updateCostumer,
    )
  }

  async getCustomers(): Promise<CustomerDto[]> {
    return this.customerRepository.getCustomers()
  }

  async getCustomerById(customerId: string): Promise<CustomerDto> {
    return this.customerRepository.getCustomerById(customerId)
  }

  async deleteCustomer(customerId: string): Promise<void> {
    return this.customerRepository.deleteCustomer(customerId)
  }
}
