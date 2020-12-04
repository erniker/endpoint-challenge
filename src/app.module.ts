import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { MobileCatalogModule } from './mobileCatalog/infrastructure/mobileCatalog.module'
import { CustomerModule } from './customer/infrastructure/customer.module'
import { OrderModule } from './order/infrastructure/order.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MobileCatalogModule,
    CustomerModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
