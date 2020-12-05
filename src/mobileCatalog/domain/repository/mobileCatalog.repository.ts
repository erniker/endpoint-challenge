import { CreateMobileCatalogDto } from '../dto/create-mobileCatalog.dto'
import { UpdateMobileCatalogDto } from '../dto/update-mobileCatalog.dto'
import { MobileCatalogDto } from '../../../commons/dto/mobileCatalog.dto'

export interface MobileCatalogRepository {
  createMobile(
    createMobile: CreateMobileCatalogDto,
  ): Promise<MobileCatalogDto>

  updateMobile(
    mobileId: string,
    createMobile: UpdateMobileCatalogDto,
  ): Promise<void>

  getMobiles(): Promise<MobileCatalogDto[]>

  getMobileById(mobileId: string): Promise<MobileCatalogDto>

  getMobileByIds(mobilesId: string[]): Promise<MobileCatalogDto[]>

  deleteMobile(mobileId: string): Promise<void>
}

export const MOBILE_CATALOG_REPOSITORY = 'MOBILE_CATALOG_REPOSITORY'
