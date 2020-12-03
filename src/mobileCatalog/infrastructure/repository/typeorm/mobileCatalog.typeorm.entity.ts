import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

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
}
