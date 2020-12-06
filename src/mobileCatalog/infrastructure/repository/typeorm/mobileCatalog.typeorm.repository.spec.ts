import { Test } from '@nestjs/testing'
import { MobileCatalogRepositoryTypeorm } from './mobileCatalog.typeorm.repository'
import { CreateMobileCatalogDto } from './../../../domain/dto/create-mobileCatalog.dto'
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { MobileCatalogDto } from '../../../../commons/dto/mobileCatalog.dto'
import { psCodes } from '../../../../commons/psCodes.enum'

describe('MobileCatalogRepository', () => {
  let mobileCatalogRepository
  const mockCreateOrupdateMobileDtoSuccess: CreateMobileCatalogDto = {
    image: 'https://imagen.jpg',
    name: 'muchoPhone',
    description: 'Movil de la empresa Mucho',
    price: 100
  }
  const mockMobileCatalogId = 'z99z99z9-9z99-999z-9z99-999999z9zzz9'

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MobileCatalogRepositoryTypeorm],
    }).compile()
    mobileCatalogRepository = await module.get<MobileCatalogRepositoryTypeorm>(
      MobileCatalogRepositoryTypeorm,
    )
  })

  describe('method: createMobile', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      mobileCatalogRepository.create = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        mobileCatalogRepository.createMobile(
          mockCreateOrupdateMobileDtoSuccess,
        ),
      ).resolves.not.toThrow()
    })

    it('MobileCatalog name already exists', async () => {
      save.mockRejectedValue({ code: psCodes.ConflictError })
      let response
      try {
        response = await mobileCatalogRepository.createMobile(
          mockCreateOrupdateMobileDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof ConflictException).toBe(true)
    })

    it('MobileCatalog insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await mobileCatalogRepository.createMobile(
          mockCreateOrupdateMobileDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: updateMobile', () => {
    let save
    beforeEach(() => {
      save = jest.fn()
      mobileCatalogRepository.getMobilesById = jest.fn().mockReturnValue({ save })
    })

    it('Happy path', () => {
      save.mockResolvedValue(undefined)
      expect(
        mobileCatalogRepository.updateMobile(
          mockMobileCatalogId,
          mockCreateOrupdateMobileDtoSuccess
        ),
      ).resolves.not.toThrow()
    })

    it('MobileCatalog insert unknown issue', async () => {
      save.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await mobileCatalogRepository.updateMobile(
          mockMobileCatalogId,
          mockCreateOrupdateMobileDtoSuccess
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: getCustomers', () => {
    const mockCustomersArray: MobileCatalogDto[] = [
      {
        id: 'string',
        image: 'https://imagen.jpg',
        name: 'muchoPhone',
        description: 'Movil de la empresa Mucho',
        price: 100,
        createdAt: 'string',
        updatedAt: 'string',
      },
      {
        id: 'string',
        image: 'https://imagen.jpg',
        name: 'muchoPhone',
        description: 'Movil de la empresa Mucho',
        price: 100,
        createdAt: 'string',
        updatedAt: 'string',
      },
    ]
    const mockCustomersArrayLength = mockCustomersArray.length
    it('Happy path', async () => {
      mobileCatalogRepository.find = jest.fn().mockReturnValue(mockCustomersArray)
      const response = await mobileCatalogRepository.getMobiles()

      expect(response.length).toBe(mockCustomersArrayLength)
    })
    it('DB error', async () => {
      let response
      mobileCatalogRepository.find = jest.fn().mockRejectedValue(undefined)
      try {
        response = await mobileCatalogRepository.getMobiles()
      } catch (err) {
        response = err
      }

      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })

  describe('method: deleteMobile', () => {
    let remove
    beforeEach(() => {
      remove = jest.fn()
      mobileCatalogRepository.getMobilesById = jest
        .fn()
        .mockReturnValue({ remove })
    })

    it('Happy path', async () => {
      remove.mockResolvedValue(undefined)
      expect(
        mobileCatalogRepository.deleteMobile(mockMobileCatalogId),
      ).resolves.not.toThrow()
    })

    it('MobileCatalog delete unknown issue', async () => {
      remove.mockRejectedValue({ code: 'UNKNOWN_ERROR' }) // unhandled error code
      let response
      try {
        response = await mobileCatalogRepository.deleteMobile(
          mockMobileCatalogId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
    it('Try to delete a non existing mobileCatalog', async () => {
      mobileCatalogRepository.getMobilesById = jest
        .fn()
        .mockResolvedValue(undefined)
      let response
      try {
        response = await mobileCatalogRepository.deleteMobile(
          mockMobileCatalogId
        )
      } catch (err) {
        response = err
      }
      expect(response instanceof InternalServerErrorException).toBe(true)
    })
  })
})
