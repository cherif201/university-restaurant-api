import { Test, TestingModule } from '@nestjs/testing';
import { DailyMenuController } from './daily-menu.controller';

describe('DailyMenuController', () => {
  let controller: DailyMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyMenuController],
    }).compile();

    controller = module.get<DailyMenuController>(DailyMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
