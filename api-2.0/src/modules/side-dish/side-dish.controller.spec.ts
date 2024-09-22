import { Test, TestingModule } from '@nestjs/testing';

import { SideDishController } from './side-dish.controller';
import { SideDishService } from './side-dish.service';

describe('SideDishController', () => {
  let controller: SideDishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SideDishController],
      providers: [SideDishService],
    }).compile();

    controller = module.get<SideDishController>(SideDishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
