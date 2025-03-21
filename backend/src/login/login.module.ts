import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/userDB.entity';
import { CompanyInfo } from 'src/models/companyInfo.entity';
import { ManagerSite } from 'src/models/managerSite.entity';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from './hashing.service';

@Module({
  imports: [SequelizeModule.forFeature([Users, CompanyInfo, ManagerSite])
    , JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }), ConfigModule.forRoot()],
  controllers: [LoginController],
  providers: [LoginService, HashingService],
})
export class LoginModule { }
