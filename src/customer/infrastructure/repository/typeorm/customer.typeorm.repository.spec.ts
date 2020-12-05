import { Test } from '@nestjs/testing'
import { CustomerRepositoryTypeorm } from './customer.typeorm.repository'
import { CreateCustomerDto } from './../../../domain/dto/create-customer.dto'
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import { CustomerDto } from '../../../domain/dto/customer.dto'
import { psCodes } from '../../../../commons/psCodes.enum'

describe('CustomerRepository', () => {
  let customerRepository
  const mockCreateOrUpdateCustomerDtoSuccess: CreateCustomerDto = {
    name: 'pepe',
    surname: 'pepón',
    email: 'pepepepon@123.com',
  }
  const mockCustomerId = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CustomerRepositoryTypeorm],
    }).compile()
    customerRepository = await module.get<CustomerRepositoryTypeorm>(
      CustomerRepositoryTypeorm,
    )
  })

  describe('method: createCustomer', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      customerRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        customerRepository.createCustomer(
          mockCreateOrUpdateCustomerDtoSuccess,
        ),
      ).resolves.not.toThrow()
    })

    it('Customer name already exists', async () => {
      save.mockRejectedValue({ code: psCodes.ConflictError })
      let response
      try {
        response = await customerRepository.createCustomer(
          mockCreateOrUpdateCustomerDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof ConflictException).toBe(true)
    })

    it('Customer insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await customerRepository.createCustomer(
          mockCreateOrUpdateCustomerDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: updateCustomer', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      customerRepository.getCustomerById = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        customerRepository.updateCustomer(
          mockCustomerId,
          mockCreateOrUpdateCustomerDtoSuccess
        ),
      ).resolves.not.toThrow()
    })

    it('Customer insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await customerRepository.updateCustomer(
          mockCustomerId,
          mockCreateOrUpdateCustomerDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to change a non existing customer', async () => {
      customerRepository.getCustomerById = jest
        .fn()
        .mockResolvedValue(undefined)

      let response
      try {
        response = await customerRepository.updateCustomer(
          mockCustomerId,
          mockCreateOrUpdateCustomerDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof BadRequestException).toBe(true)
    })
  })

  describe('method: getCustomers', () => {
    const mockCustomersArray: CustomerDto[] = [
      {
        id: 'string',
        name: 'pepe',
        surname: 'pepón',
        email: 'pepepepon@123.com',
        createdAt: 'string',
        updatedAt: 'string',
      },
      {
        id: 'string',
        name: 'pepe',
        surname: 'pepón',
        email: 'pepepepon@123.com',
        createdAt: 'string',
        updatedAt: 'string',
      },
    ]

    const mockCustomersArrayLength = mockCustomersArray.length
    it('Happy path', async () => {
      customerRepository.find = jest.fn().mockReturnValue(mockCustomersArray)
      const response = await customerRepository.getCustomers()

      expect(response.length).toBe(mockCustomersArrayLength)
    })
    it('DB error', async () => {
      let response
      customerRepository.find = jest.fn().mockRejectedValue(undefined)
      try {
        response = await customerRepository.getCustomers()
      } catch (err) {
        response = err
      }

      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: deleteCustomer', () => {
    let remove
    beforeEach(() => {
      remove = jest.fn()
      customerRepository.getCustomerById = jest
        .fn()
        .mockReturnValue({ remove })
    })

    it('Happy path', async () => {
      remove.mockResolvedValue(undefined)
      expect(
        customerRepository.deleteCustomer(mockCustomerId),
      ).resolves.not.toThrow()
    })

    it('Customer delete unknown issue', async () => {
      remove.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await customerRepository.deleteCustomer(
          mockCustomerId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to delete a non existing contact', async () => {
      customerRepository.getCustomerById = jest
        .fn()
        .mockResolvedValue(undefined)
      let response
      try {
        response = await customerRepository.deleteCustomer(
          mockCustomerId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })
})
