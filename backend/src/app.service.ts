import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { config } from 'dotenv'
import { Users, UserType } from './models/userDB.entity';
import * as bcrypt from 'bcrypt';

config()

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users
  ) { }
  async onModuleInit() {
    const adminExists = await this.userModel.findOne({
      where: { userType: UserType.ADMIN }
    });

    if (adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.MANAGER_PASSWORD, 10)
      await this.userModel.create({
        name: process.env.MANAGER_ID,
        email: '0000',
        password: hashedPassword,
        userType: UserType.ADMIN
      });
      console.log('관리자 계정 생성됨')
    } else {
      console.log('관리자 계정 생성됨')
    }
  }
}
