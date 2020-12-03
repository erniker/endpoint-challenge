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
import { CreateMobileCatalogDto } from '../../domain/dto/create-mobileCatalog.dto'
import { MobileCatalogService } from '../../application/mobileCatalog.service'
import { MobileCatalogDto } from '../../../commons/dto/mobileCatalog.dto'
import {
    UpdateMobileCatalogDto
} from '../../domain/dto/update-mobileCatalog.dto'

@Controller('mobileCatalog')
export class MobileCatalogController {
    private logger = new Logger('MobileCatalogController')

    constructor(
        private mobileCatalogService: MobileCatalogService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createMobile(
        @Body() createMobile: CreateMobileCatalogDto,
    ): Promise<MobileCatalogDto> {

        const { ...mobile } = await this.mobileCatalogService.createMobile(
            createMobile,
        )
        return { ...mobile }
    }
    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateMobile(
        @Param('id', ParseUUIDPipe) id: string,
        @Body()
        updateMobile: UpdateMobileCatalogDto,
    ): Promise<void> {
        return this.mobileCatalogService.updateMobile(
            id,
            updateMobile
        )
    }
    @Get()
    async getMobiles(): Promise<MobileCatalogDto[]> {
        return this.mobileCatalogService.getMobiles()
    }

    @Get('/:id')
    getContact(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<MobileCatalogDto> {
        return this.mobileCatalogService.getMobileById(id)
    }

    @Delete('/:id')
    deleteContact(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<void> {
        return this.mobileCatalogService.deleteMobile(id)
    }
}
