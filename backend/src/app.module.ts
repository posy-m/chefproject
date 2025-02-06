import { config } from 'dotenv'
config()
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from './models/resume.entity';
import { SavedAnnouncement } from './models/savedAnnouncement.entity';
import { SupportDetails } from './models/supportDetails.entity';
import { LoginModule } from './login/login.module';
import { RecruitmentNoticeModule } from './recruitment-notice/recruitment-notice.module';
import { LoggerMiddleware } from './login/middleware/logger.middleware';
import * as cookie from 'cookie-parser';


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
    LoginModule,
    RecruitmentNoticeModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('login')
    consumer
      .apply(cookie())
      .forRoutes('*')
  }
}
