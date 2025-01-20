import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/models/userDB.entity';
import { CompanyInfo } from 'src/models/companyInfo.entity';
import { ManagerSite } from 'src/models/managerSite.entity';

@Module({
  imports: [SequelizeModule.forFeature([Users, CompanyInfo, ManagerSite])],
  providers: [UserService]
})
export class UserModule { }
