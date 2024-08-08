import { Test, TestingModule } from '@nestjs/testing';
import { BigcommerceService } from './bigcommerce.service';

describe('BigcommerceService', () => {
  let service: BigcommerceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigcommerceService],
    }).compile();

    service = module.get<BigcommerceService>(BigcommerceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
