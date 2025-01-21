import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';  // JWT를 사용하기 위해 추가

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new BadRequestException('승인 헤더가 누락되었습니다.');
    }

    const [scheme, token] = authorization.split(' ');
    if (scheme.toLowerCase() !== 'bearer') {
      throw new BadRequestException('승인 헤더는 Bearer 토큰이어야 합니다.');
    }

    // JWT 검증
    try {
      const payload = await this.jwtService.verifyAsync(token);  // JWT 검증
      request.user = payload;
      return true;  // 인증 통과
    } catch (error) {
      throw new BadRequestException('잘못된 토큰');
    }
  }
}
