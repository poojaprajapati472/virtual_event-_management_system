import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BasicStrategy } from 'passport-http';
import { AuthService } from './basic.auth.guard';

@Injectable()
export class BasicAuthGuard extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(Username: string, Password: string): Promise<any> {
    const user = await this.authService.validateUser(Username, Password);
    // console.log(user)
    // console.log(Username, Password);
    // console.log('ekrgnekgnk');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
