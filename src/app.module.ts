import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';
import { BigCommerceService } from './bigcommerce/bigcommerce.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, BigCommerceService],
})
export class AppModule {}
