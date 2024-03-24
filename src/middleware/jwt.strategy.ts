import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'pooja',
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      email: payload.email,
      roles: payload.roles,
      // username: payload.username,
    };
  }
}
