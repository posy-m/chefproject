import { BadRequestException, Body, ConflictException, Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';

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

  // 유효성 체크
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

  // 로그인
  @Post('login')
  async login(@Body() loginDto: UserLoginDto) {
    return this.loginService.login(loginDto)
  }
}
