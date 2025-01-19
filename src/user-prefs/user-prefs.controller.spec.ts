import { Test, TestingModule } from '@nestjs/testing';
import { UserPrefsController } from './user-prefs.controller';

describe('UserPrefsController', () => {
  let controller: UserPrefsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPrefsController],
    }).compile();

    controller = module.get<UserPrefsController>(UserPrefsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
