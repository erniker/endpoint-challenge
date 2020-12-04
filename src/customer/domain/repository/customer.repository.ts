import { CreateCustomerDto } from '../dto/create-customer.dto'
import { UpdateCustomerDto } from '../dto/update-customer.dto'
import { CustomerDto } from '../dto/customer.dto'

export interface CustomerRepository {
  createCustomer(
    createCustomer: CreateCustomerDto,
  ): Promise<CustomerDto>
  updateCustomer(
    customerId: string,
    updateCustomer: UpdateCustomerDto,
  ): Promise<void>
  getCustomers(): Promise<CustomerDto[]>

  getCustomerById(customerId: string): Promise<CustomerDto>

  deleteCustomer(customerId: string): Promise<void>
}

export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY'
