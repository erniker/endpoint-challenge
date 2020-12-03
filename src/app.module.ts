import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { MobileCatalogModule } from './mobileCatalog/infrastructure/mobileCatalog.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MobileCatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
