import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { OrderMobile } from '../../../../order/infrastructure/repository/typeorm/orderMobile.typeorm.entity'
@Entity()
@Unique(['name'])
export class MobileCatalog extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    image: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @OneToMany(
        type => OrderMobile,
        orderMobile => orderMobile.mobile,
        { eager: false })
    public orderMobile!: OrderMobile[];

}
