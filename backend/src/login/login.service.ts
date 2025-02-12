import { config } from 'dotenv'
config();
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users, UserType } from 'src/models/userDB.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateCompanyUserDto, CreateUserDto, UserLoginDto } from './dto/user.dto';
import { Op } from 'sequelize';


@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
    private readonly jwtService: JwtService
  ) { }

  // 개인회원가입
  async createUser(createUser: CreateUserDto): Promise<Users> {
    const { name, email, phoneNumber, password, userType } = createUser

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return this.userModel.create({
      name, email, phoneNumber, password: hashedPassword, userType: userType || UserType.PERSONAL
    })
  }

  // 기업 회원가입
  async createCompanyUser(createCompany: CreateCompanyUserDto): Promise<Users> {
    const { name, email, phoneNumber, password, businessNumber } = createCompany;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return this.userModel.create({
      name, email, phoneNumber, password: hashedPassword, businessNumber
    })
  }

  //이메일,휴대폰 번호 중복검사
  async checkDuplicate(email?: string, phoneNumber?: string): Promise<boolean> {
    const conditions = [];
    if (email) conditions.push({ email });
    if (phoneNumber) conditions.push({ phoneNumber });
    if (conditions.length === 0) {
      throw new BadRequestException('이메일 또는 휴대폰 번호를 입력해주세요.');
    }
    const existingUser = await this.userModel.findOne({
      where: { [Op.or]: conditions }
    });
    return !!existingUser;
  }



  //모든 데이터 조회
  async findAll(): Promise<Users[]> {
    return await this.userModel.findAll()
  }


  //로그인
  async login(login: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = login;

    const user = await this.userModel.findOne({ where: { email } })
    if (!user) {
      throw new BadRequestException('이메일이 잘못 됨')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('비밀번호가 잘못 됨')
    }

    const payload = { id: user.id, email: user.email, userType: user.userType };
    const accessToken = await this.jwtService.signAsync(payload)

    return { accessToken }

  }



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
