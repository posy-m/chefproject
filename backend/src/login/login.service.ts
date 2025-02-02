import { config } from 'dotenv'
config();
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users, UserType } from 'src/models/userDB.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/user.dto';


@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
    private readonly jwtService: JwtService
  ) { }

  // 회원가입
  async create(createUser: CreateUserDto): Promise<Users> {
    const { name, email, phoneNumber, password } = createUser

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(createUser.password, salt)
    console.log(hashedPassword, "이거 ");
    return this.userModel.create({
      name, email, phoneNumber, password: hashedPassword
    })
  }

  //로그인


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
}
