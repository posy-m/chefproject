import { Module } from '@nestjs/common';
import { RecruitmentNoticeService } from './recruitment-notice.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecruitmentNotice } from 'src/models/recruitmentNotice.entity';
import { CompanyImg } from 'src/models/companyImg.entity';

@Module({
  imports: [SequelizeModule.forFeature([RecruitmentNotice, CompanyImg])],
  providers: [RecruitmentNoticeService]
})
export class RecruitmentNoticeModule { }
