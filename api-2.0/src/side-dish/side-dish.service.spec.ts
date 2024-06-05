import { Test, TestingModule } from '@nestjs/testing';

import { SideDishService } from './side-dish.service';

describe('SideDishService', () => {
  let service: SideDishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SideDishService],
    }).compile();

    service = module.get<SideDishService>(SideDishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
