import { Order } from '../../../../order/infrastructure/repository/typeorm/order.typeorm.entity'
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

@Entity()
@Unique(['email'])
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updatedAt: string

  @OneToMany(
    type => Order,
    order => order.customer,
    { eager: false },
  )
  orders: Order[]

}
