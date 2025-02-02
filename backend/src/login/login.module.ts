import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/userDB.entity';
import { CompanyInfo } from 'src/models/companyInfo.entity';
import { ManagerSite } from 'src/models/managerSite.entity';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SequelizeModule.forFeature([Users, CompanyInfo, ManagerSite])
    , JwtModule.register({ signOptions: { expiresIn: '60s' } }), ConfigModule.forRoot()],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
