import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

import { MobileCatalog } from '../../../../mobileCatalog/infrastructure/repository/typeorm/mobileCatalog.typeorm.entity'
import { Order } from '../../../../order/infrastructure/repository/typeorm/order.typeorm.entity'



@Entity()
export class OrderMobile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  orderId: string

  @Column()
  mobileId: string

  @Column()
  price: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @ManyToOne(
    type => Order,
    order => order.orderMobile,
    { onDelete: 'CASCADE' },
  )
  order!: Order

  @ManyToOne(
    type => MobileCatalog,
    mobileCatalog => mobileCatalog.orderMobile,
  )
  mobile!: MobileCatalog

}
