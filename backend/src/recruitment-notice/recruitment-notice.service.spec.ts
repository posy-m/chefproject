import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentNoticeService } from './recruitment-notice.service';

describe('RecruitmentNoticeService', () => {
  let service: RecruitmentNoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecruitmentNoticeService],
    }).compile();

    service = module.get<RecruitmentNoticeService>(RecruitmentNoticeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
