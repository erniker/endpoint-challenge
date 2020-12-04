import { Module } from '@nestjs/common'
import { DatabaseProviders } from '../../config/database.provider'
import { CustomerProviders } from './customer.provider'
import { CustomerController } from './controller/customer.controller'
import { CustomerService } from '../application/customer.service'

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, ...DatabaseProviders, ...CustomerProviders],
})
export class CustomerModule { }
