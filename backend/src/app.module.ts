import { config } from 'dotenv'
config()
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './models/userDB.entity';
import { CompanyInfo } from './models/companyInfo.entity';
import { CompanyImg } from './models/companyImg.entity';
import { ManagerSite } from './models/managerSite.entity';
import { RecruitmentNotice } from './models/recruitmentNotice.entity';
import { Resume } from './models/resume.entity';
import { SavedAnnouncement } from './models/savedAnnouncement.entity';
import { SupportDetails } from './models/supportDetails.entity';



@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'chefproject',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      Users,
      CompanyInfo,
      CompanyImg,
      ManagerSite,
      RecruitmentNotice,
      Resume,
      SavedAnnouncement,
      SupportDetails
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
