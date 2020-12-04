import { Repository, EntityRepository } from 'typeorm'
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common'
import { Customer } from './customer.typeorm.entity'
import { CustomerRepository } from '../../../domain/repository/customer.repository'
import { CustomerDto } from '../../../domain/dto/customer.dto'
import { CreateCustomerDto } from '../../../domain/dto/create-customer.dto'
import { UpdateCustomerDto } from '../../../domain/dto/update-customer.dto'
import { psCodes } from '../../../../commons/psCodes.enum'

@EntityRepository(Customer)
export class CustomerRepositoryTypeorm extends Repository<Customer>
  implements CustomerRepository {

  async createCustomer(
    createCustomer: CreateCustomerDto,
  ): Promise<CustomerDto> {
    try {
      const { name, surname, email } = createCustomer

      const customer = this.create()

      customer.name = name
      customer.surname = surname
      customer.email = email

      await customer.save()
      return customer
    } catch (error) {
      if (error.code == psCodes.ConflictError) {

        throw new ConflictException('Email already exists')
      }
      if (error instanceof BadRequestException)
        throw new BadRequestException()

      throw new InternalServerErrorException()
    }
  }

  async updateCustomer(
    customerId: string,
    updateCustomer: UpdateCustomerDto,
  ): Promise<void> {
    try {
      const { name, surname, email } = updateCustomer

      const customer = await this.getCustomerById(customerId)

      if (!customerId) {
        throw new NotFoundException("Customer doesn't exists")
      }

      customer.name = name
      customer.surname = surname
      customer.email = email

      await customer.save()

    } catch (err) {
      if (err.code == psCodes.ConflictError)
        throw new ForbiddenException('The customer email is already taken')
      if (err instanceof NotFoundException)
        throw new NotFoundException("Customer doesn't exists")
      if (err instanceof BadRequestException)
        throw new BadRequestException()
      throw new InternalServerErrorException()
    }
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    const found = await this.findOne({
      where: { id: customerId },
    })

    if (!found) {
      throw new NotFoundException(
        `Customer with ID "${customerId}" not found`,
      )
    }

    return found
  }

  async getCustomers(): Promise<CustomerDto[]> {
    try {
      return await this.find({
        order: {
          name: 'ASC'
        }
      })
    } catch (err) {
      if (err instanceof NotFoundException)
        throw new NotFoundException("Customer doesn't exists")
      if (err instanceof BadRequestException)
        throw new BadRequestException()
      throw new InternalServerErrorException()
    }
  }

  async deleteCustomer(customerId: string): Promise<void> {
    try {
      await this.delete(customerId)
    } catch (err) {
      throw new InternalServerErrorException()
    }
  }
}
