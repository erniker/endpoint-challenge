import { Customer } from '../../../../customer/infrastructure/repository/typeorm/customer.typeorm.entity'

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { OrderMobile } from './orderMobile.typeorm.entity'

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(
    type => Customer,
    customer => customer.orders,
    { eager: true },
  )
  customer: Customer

  @Column()
  customerId: string

  @Column()
  totalPrice: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @OneToMany(
    type => OrderMobile,
    orderMobile => orderMobile.order,
    { eager: false, cascade: ['insert', 'update', 'remove'] })
  orderMobile!: OrderMobile[];


}
