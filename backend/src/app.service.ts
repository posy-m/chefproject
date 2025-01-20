import { config } from 'dotenv'
config();
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users, UserType } from './models/userDB.entity';
import * as bcrypt from 'bcrypt';
import { SupportDetails } from './models/supportDetails.entity';
import { SavedAnnouncement } from './models/savedAnnouncement.entity';
import { Resume } from './models/resume.entity';
import { RecruitmentNotice } from './models/recruitmentNotice.entity';
import { ManagerSite } from './models/managerSite.entity';
import { CompanyInfo } from './models/companyInfo.entity';


@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Users) private userModel: typeof Users,
    @InjectModel(SupportDetails) private supportDetailsModel: typeof SupportDetails,
    @InjectModel(SavedAnnouncement) private savedAnnouncementModel: typeof SavedAnnouncement,
    @InjectModel(Resume) private resumeModel: Resume,
    @InjectModel(RecruitmentNotice) private recruitmentNoticeModel: typeof RecruitmentNotice,
    @InjectModel(ManagerSite) private managerSiteModel: ManagerSite,
    @InjectModel(CompanyInfo) private compnayInfoModel: CompanyInfo,
  ) { }

  // 관리자 아이디 생성
  async onModuleInit() {
    const adminExists = await this.userModel.findOne({
      where: { userType: UserType.ADMIN }
    });

    if (!adminExists) {
      const managerPassword = process.env.MANAGER_PASSWORD;
      if (!managerPassword) {
        throw new Error('MANAGER_PASSWORD가 설정되지 않았습니다.');
      }
      const hashedPassword = await bcrypt.hash(managerPassword, 10);
      await this.userModel.create({
        name: process.env.MANAGER_ID,
        email: '0000@admin.com',
        password: hashedPassword,
        userType: UserType.ADMIN,
        phoneNumber: '00000000000', // 기본값
      });
      console.log('관리자 계정 생성됨');
    } else {
      console.log('관리자 계정 이미 존재함');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}

