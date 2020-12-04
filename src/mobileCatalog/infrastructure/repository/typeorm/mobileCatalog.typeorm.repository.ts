import { Repository, EntityRepository } from 'typeorm'
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common'
import { MobileCatalog } from './mobileCatalog.typeorm.entity'
import { MobileCatalogRepository } from '../../../domain/repository/mobileCatalog.repository'
import { CreateMobileCatalogDto } from '../../../domain/dto/create-mobileCatalog.dto'
import { MobileCatalogDto } from '../../../../commons/dto/mobileCatalog.dto'
import { UpdateMobileCatalogDto } from '../../../domain/dto/update-mobileCatalog.dto'
import { psCodes } from '../../../../commons/psCodes.enum'

@EntityRepository(MobileCatalog)
export class MobileCatalogRepositoryTypeorm extends Repository<MobileCatalog>
    implements MobileCatalogRepository {

    async createMobile(
        createMobile: CreateMobileCatalogDto,
    ): Promise<MobileCatalogDto> {
        try {
            const { image, name, description, price } = createMobile

            const mobile = this.create()

            mobile.image = image
            mobile.name = name
            mobile.description = description
            mobile.price = price

            await mobile.save()
            return mobile

        } catch (error) {
            if (error.code == psCodes.ConflictError) {

                throw new ConflictException('The name of mobile already exists')
            }
            if (error instanceof BadRequestException)
                throw new BadRequestException()

            throw new InternalServerErrorException()
        }
    }
    async updateMobile(
        mobileId: string,
        updateMobile: UpdateMobileCatalogDto,
    ): Promise<void> {
        try {
            const { image, name, description, price } = updateMobile

            const mobilefound = await this.getMobileById(mobileId)

            if (!mobilefound) {
                throw new BadRequestException()
            }

            mobilefound.image = image
            mobilefound.name = name
            mobilefound.description = description
            mobilefound.price = price

            await mobilefound.save()

        } catch (err) {
            if (err.code == psCodes.ConflictError)
                throw new ForbiddenException('The name of mobile already exists')
            if (err instanceof NotFoundException)
                throw new NotFoundException("The name of mobile doesn't exists")
            if (err instanceof BadRequestException)
                throw new BadRequestException()
            throw new InternalServerErrorException()
        }
    }

    async getMobileById(mobileId: string): Promise<MobileCatalog> {
        const found = await this.findOne({
            where: { id: mobileId },
        })

        if (!found) {
            throw new NotFoundException(
                `Contact with ID "${mobileId}" not found`,
            )
        }

        return found
    }

    async getMobiles(): Promise<MobileCatalogDto[]> {
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

    async deleteMobile(mobileId: string): Promise<void> {
        try {
            await this.delete(mobileId)
        } catch (err) {
            throw new InternalServerErrorException()
        }
    }
}
