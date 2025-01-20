import { config } from 'dotenv'
config()
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from './models/resume.entity';
import { SavedAnnouncement } from './models/savedAnnouncement.entity';
import { SupportDetails } from './models/supportDetails.entity';
import { UserModule } from './login/user.module';
import { RecruitmentNoticeModule } from './recruitment-notice/recruitment-notice.module';



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
      Resume,
      SavedAnnouncement,
      SupportDetails
    ]),
    UserModule,
    RecruitmentNoticeModule
  ],
})
export class AppModule { }
