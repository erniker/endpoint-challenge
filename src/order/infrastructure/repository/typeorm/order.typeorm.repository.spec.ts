import { Test } from '@nestjs/testing'
import { OrderRepositoryTypeorm } from './order.typeorm.repository'
import { CreateOrderDto } from '../../../domain/dto/create-order.dto'
import { PrepareOrderDto } from '../../../domain/dto/prepare-order.dto'
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { OrderDto } from '../../../../order/domain/dto/order.dto'
import { psCodes } from '../../../../commons/psCodes.enum'

describe('OrderRepository', () => {
  let orderRepository
  const mockPrepareOrderDtoSuccess: PrepareOrderDto = {
    "customerId": "z99z99z9-9z99-999z-9z99-999999z9zzz9",
    "mobileIds": [
      "z88z99z9-9z99-999z-9z99-999999z9zzz9"
    ]
  }
  const mockCreateOrderDtoSuccess: CreateOrderDto = {
    customerId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
    orderMobile: [
      {
        mobileId: "z88z99z9-9z99-999z-9z99-999999z9zzz9",
        price: 9999,
        orderId: "z99z99z9-9z99-999z-9z99-999999z9zzz9",
        id: "fce5740f-da0f-4b1b-a7f9-57f5ecceea92",
        createdAt: "2020-12-06T10:23:58.317Z",
        updatedAt: "2020-12-06T10:23:58.317Z"
      }
    ],
    "totalPrice": 9999,
  }
  const mockOrderId = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [OrderRepositoryTypeorm],
    }).compile()
    orderRepository = await module.get<OrderRepositoryTypeorm>(
      OrderRepositoryTypeorm,
    )
  })

  describe('method: creatOrder', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      orderRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        orderRepository.createOrder(
          mockPrepareOrderDtoSuccess,
        ),
      ).resolves.not.toThrow()
    })

    it('Order insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await orderRepository.createOrder(
          mockPrepareOrderDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: getOrders', () => {
    const mockOrdersArray: OrderDto[] = [
      {
        id: "62fee9f8-a329-4fd7-8a13-b12826b19dd2",
        customerId: "bac7dd1f-252d-447b-ad7a-7bbc9c40c212",
        totalPrice: 909,
        createdAt: "2020-12-06T20:56:09.446Z",
        updatedAt: "2020-12-06T20:56:09.446Z",
        orderMobile: [
          {
            id: "49a70420-7037-4e85-92e9-37ddff6f053e",
            orderId: "62fee9f8-a329-4fd7-8a13-b12826b19dd2",
            mobileId: "ada36a71-9f56-4587-8fae-ac844418c52c",
            pricw: 909,
            createdAt: "2020-12-06T20:56:09.446Z",
            updatedAt: "2020-12-06T20:56:09.446Z"
          }
        ]
      },
      {
        id: "62fee9f8-a329-4fd7-8a13-b12826b19dd2",
        customerId: "bac7dd1f-252d-447b-ad7a-7bbc9c40c212",
        totalPrice: 909,
        createdAt: "2020-12-06T20:56:09.446Z",
        updatedAt: "2020-12-06T20:56:09.446Z",
        orderMobile: [
          {
            id: "49a70420-7037-4e85-92e9-37ddff6f053e",
            orderId: "62fee9f8-a329-4fd7-8a13-b12826b19dd2",
            mobileId: "ada36a71-9f56-4587-8fae-ac844418c52c",
            pricw: 909,
            createdAt: "2020-12-06T20:56:09.446Z",
            updatedAt: "2020-12-06T20:56:09.446Z"
          }
        ]
      },
    ]



    const mockCustomersArrayLength = mockOrdersArray.length
    it('Happy path', async () => {
      orderRepository.find = jest.fn().mockReturnValue(mockOrdersArray)
      const response = await orderRepository.getOrders()

      expect(response.length).toBe(mockCustomersArrayLength)
    })
    it('DB error', async () => {
      let response
      orderRepository.find = jest.fn().mockRejectedValue(undefined)
      try {
        response = await orderRepository.getOrders()
      } catch (err) {
        response = err
      }

      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: deleteOrder', () => {
    let remove
    beforeEach(() => {
      remove = jest.fn()
      orderRepository.getOrderById = jest
        .fn()
        .mockReturnValue({ remove })
    })

    it('Happy path', async () => {
      remove.mockResolvedValue(undefined)
      expect(
        orderRepository.deleteOrder(mockOrderId),
      ).resolves.not.toThrow()
    })

    it('MobileCatalog delete unknown issue', async () => {
      remove.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await orderRepository.deleteOrder(
          mockOrderId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to delete a non existing mobileCatalog', async () => {
      orderRepository.getMobilesById = jest
        .fn()
        .mockResolvedValue(undefined)
      let response
      try {
        response = await orderRepository.deleteOrder(
          mockOrderId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })
})
