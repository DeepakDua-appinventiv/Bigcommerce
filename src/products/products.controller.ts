import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BigCommerceService } from '../bigcommerce/bigcommerce.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly bigCommerceService: BigCommerceService) { }

    @Get('resource')
    async getProducts() {
        return this.bigCommerceService.getProducts();
    }

    @Get('resource/:id')
    async getProductById(@Param('id') id: number) {
        return this.bigCommerceService.getProductById(id);
    }

    @Get('categories')
    async getCategories() {
        console.log("categories");
        return this.bigCommerceService.getCategories();
    }

    @Get('by-category/:id')
    async getProductsByCategory(@Param('id') id: number) {
        return this.bigCommerceService.getProductsByCategory(id);
    }

    @Post('carts/:cartId')
    async addToCart(
        @Param('cartId') cartId: string,
        @Body('productId') productId: number,
        @Body('quantity') quantity: number,
    ) {
        return this.bigCommerceService.addToCart(cartId, productId, quantity);
    }
}
