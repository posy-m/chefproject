import { Test, TestingModule } from '@nestjs/testing';
import { RecruitmentNoticeController } from './recruitment-notice.controller';

describe('RecruitmentNoticeController', () => {
  let controller: RecruitmentNoticeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitmentNoticeController],
    }).compile();

    controller = module.get<RecruitmentNoticeController>(RecruitmentNoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
