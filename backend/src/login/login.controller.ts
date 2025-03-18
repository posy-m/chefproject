import { BadRequestException, Body, ConflictException, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateCompanyUserDto, CreateUserDto, FindUserIdDto, ResetPasswordDto, UserCheckDto, UserLoginDto } from './dto/user.dto';
import { log } from 'console';

@UseInterceptors()
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  //일반 회원가입
  @Post('usersignup')
  async signup(@Body() signupDTO: CreateUserDto) {
    console.log(signupDTO, "회원가입 요청 데이터");
    try {
      const createdUser = await this.loginService.createUser(signupDTO);
      return createdUser;
    } catch (error) {
      console.error('회원가입 실패', error)
    }
  }
  //기업 회원가입
  @Post('companysignup')
  async companysignup(@Body() compnaysignupDTO: CreateCompanyUserDto) {
    console.log(compnaysignupDTO, '기업 회원가입 요청 데이터')
    try {
      const createCompanyUser = await this.loginService.createCompanyUser(compnaysignupDTO);
      return createCompanyUser;
    } catch (error) {
      console.error('기업 회원가입 실패', error);

    }
  }

  // 개인_이메일,번호중복검사
  @Post('check-duplicate')
  async checkDuplicate(@Body() body: { email?: string; phoneNumber?: string }) {
    const { email, phoneNumber } = body;
    if (!email && !phoneNumber) {
      throw new BadRequestException('이메일 또는 휴대폰 번호를 입력해주세요.');
    }
    const isDuplicate = await this.loginService.checkDuplicate(email, phoneNumber);
    if (isDuplicate) {
      throw new ConflictException('이미 사용 중인 이메일 또는 폰번호입니다.');
    }
    return { message: '사용 가능' };
  }

  //기업_이메일, 사업자등록, 휴대폰번호 중복검사
  @Post('company-check-duplicate')
  async companyCheckDuplicate(@Body() body: { email: string, businessNumber: string, phoneNumber: string }) {
    const { email, businessNumber, phoneNumber } = body;
    if (!email && !businessNumber && !phoneNumber) {
      throw new BadRequestException('다시 확인해 주세요')
    }
    const isDuplicate = await this.loginService.companyCheckDuplicate(email, businessNumber, phoneNumber);
    if (isDuplicate) {
      throw new ConflictException('이미 사용중인 번호입니다.')
    }
    return { message: '사용가능' }

  }

  // 로그인
  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.loginService.login(loginDto)
  }

  // 이메일 찾기
  @Post('findemail')
  async findEmail(@Body() findEmailDto: FindUserIdDto) {
    return this.loginService.findEmail(findEmailDto)
  }

  //유저확인
  @Post('verifyUser')
  async verifyUser(@Body() userCheckDto: UserCheckDto) {
    const resetToken = await this.loginService.verifyUser(userCheckDto);
    if (!resetToken) {
      throw new BadRequestException('이메일 또는 비밀번호가 일치하지 않습니다.')
    }
    return { message: '본인확인 완료', resetToken }
  }

  //비밀번호 재설정

  @Post('resetPassword')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const message = await this.loginService.restPassword(resetPasswordDto);
    return { message };
  }


}
