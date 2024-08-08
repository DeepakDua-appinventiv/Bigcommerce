import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BigCommerceService {
  private readonly storeHash = process.env.STORE_HASH;
  private readonly apiToken = process.env.API_TOKEN;
  private readonly baseUrl = `https://api.bigcommerce.com/stores/${this.storeHash}/v3`;

  constructor(private readonly httpService: HttpService) {}

  async getProducts(): Promise<AxiosResponse<any>> {
    const url = `${this.baseUrl}/catalog/products`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.apiToken,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch products from BigCommerce',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductById(productId: number): Promise<any> {
    const url = `${this.baseUrl}/catalog/products/${productId}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.apiToken,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch product details from BigCommerce',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCategories(): Promise<AxiosResponse<any>> {
    const url = `${this.baseUrl}/catalog/categories`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.apiToken,
          },
        }),
      );
      console.log("categories fetched successfully");
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to fetch categories from BigCommerce',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductsByCategory(categoryId: number): Promise<any> {
    const url = `${this.baseUrl}/catalog/products?categories=${categoryId}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.apiToken,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error.response?.data || error.message);
      throw new HttpException(
        'Failed to fetch products by category from BigCommerce',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addToCart(cartId: string, productId: number, quantity: number): Promise<any> {
    const url = `${this.baseUrl}/carts/${cartId}/items`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, {
          product_id: productId,
          quantity: quantity,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': this.apiToken,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to add item to cart',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
