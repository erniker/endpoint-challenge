import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { MobileCatalogModule } from './mobileCatalog/infrastructure/mobileCatalog.module'
import { OrderModule } from './order/infrastructure/order.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MobileCatalogModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
