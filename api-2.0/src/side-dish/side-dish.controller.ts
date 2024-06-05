import { Controller } from '@nestjs/common';

import { SideDishService } from './side-dish.service';

@Controller('side-dish')
export class SideDishController {
  constructor(private readonly sideDishService: SideDishService) {}
}
