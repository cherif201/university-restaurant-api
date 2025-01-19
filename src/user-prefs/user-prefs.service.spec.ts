import { Test, TestingModule } from '@nestjs/testing';
import { UserPrefsService } from './user-prefs.service';

describe('UserPrefsService', () => {
  let service: UserPrefsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPrefsService],
    }).compile();

    service = module.get<UserPrefsService>(UserPrefsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
