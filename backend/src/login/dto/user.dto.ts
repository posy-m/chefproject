import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserType } from 'src/models/userDB.entity';

// 개인 회원가입
export class CreateUserDto {
  @IsString()
  name: string;


  @IsEmail()
  email: string;

  @IsPhoneNumber(null)
  phoneNumber: string;

  @IsString()
  @MinLength(5, { message: '비밀번호는 최소 5자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: '비밀번호는 최소 하나의 문자, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
  userType: UserType;
}

// 기업 회원가입
export class CreateCompanyUserDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  businessNumber: string;
}


// 로그인
export class UserLoginDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: '비밀번호는 최소 5자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: '비밀번호는 최소 하나의 문자, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}

// 이메일 찾기
export class FindUserIdDto {
  @IsString()
  name?: string;

  @IsPhoneNumber(null)
  phoneNumber?: string;
}

// 인증 (email, phoneNumber)
export class UserCheckDto {
  @IsString()
  email: string;

  @IsPhoneNumber(null)
  phoneNumber?: string;
}



// 비밀번호 변경
export class ChangePasswordDto {
  @IsNumber()
  userId: number

  @IsString()
  oldPassword: string;

  @IsString()
  @MinLength(5, { message: '비밀번호는 최소 5자 이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자까지 가능합니다.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
    message: '비밀번호는 최소 하나의 문자, 숫자, 특수문자를 포함해야 합니다.',
  })
  newPassword: string;

  @IsString()
  token: string;  // 비밀번호 재설정 토큰
}

//회원 탈퇴
export class DeleteUser {
  @IsNumber()
  userId: number
}



