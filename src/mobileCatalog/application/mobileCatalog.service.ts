import { Injectable, Inject } from '@nestjs/common'
import {
    MOBILE_CATALOG_REPOSITORY,
    MobileCatalogRepository,
} from '../domain/repository/mobileCatalog.repository'
import { CreateMobileCatalogDto } from '../domain/dto/create-mobileCatalog.dto'
import { UpdateMobileCatalogDto } from '../domain/dto/update-mobileCatalog.dto'
import { MobileCatalogDto } from '../domain/dto/mobileCatalog.dto'

@Injectable()
export class MobileCatalogService {
    constructor(
        @Inject(MOBILE_CATALOG_REPOSITORY)
        private mobileCatalogRepository: MobileCatalogRepository,
    ) { }

    async createMobile(
        createMobile: CreateMobileCatalogDto,
    ): Promise<MobileCatalogDto> {
        return this.mobileCatalogRepository.createMobile(createMobile)
    }

    async updateMobile(
        mobileId: string,
        createMobile: UpdateMobileCatalogDto,
    ): Promise<void> {
        return this.mobileCatalogRepository.updateMobile(
            mobileId,
            createMobile,
        )
    }

    async getMobiles(): Promise<MobileCatalogDto[]> {
        return this.mobileCatalogRepository.getMobiles()
    }

    async getMobileById(mobileId: string): Promise<MobileCatalogDto> {
        return this.mobileCatalogRepository.getMobileById(mobileId)
    }

    async deleteMobile(mobileId: string): Promise<void> {
        return this.mobileCatalogRepository.deleteMobile(mobileId)
    }
}
