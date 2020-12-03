import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { CatalogModule } from './contact/infrastructure/catalog.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
