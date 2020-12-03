import { MobileCatalog } from "src/mobileCatalog/infrastructure/repository/typeorm/mobileCatalog.typeorm.entity"

export class OrderDto {
    id: string
    name: string
    surname: string
    email: string
    cart: MobileCatalog[]
    total: number
    createdAt: string
    updatedAt: string
}