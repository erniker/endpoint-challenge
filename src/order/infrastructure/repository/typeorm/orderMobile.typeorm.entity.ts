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
@Unique(['orderId'])
export class OrderMobile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string

  @Column()
  public orderId: string

  @Column()
  public mobileId: string

  @Column()
  public price: number

  @CreateDateColumn()
  public createdAt: string

  @UpdateDateColumn()
  public updatedAt: string

  @ManyToOne(
    type => Order,
    order => order.orderMobile,
    { onDelete: 'CASCADE' },
  )
  public order!: Order

  @ManyToOne(
    type => MobileCatalog,
    mobileCatalog => mobileCatalog.orderMobile,
  )
  public mobile!: MobileCatalog

}
