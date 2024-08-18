import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'd7eb1437fec3b6a354e5d099e879e7581cbbdcd3706c204b24a2d23ca2906fec', // Same as in AuthModule
    });
  }

  async validate(payload: any) {
    return await this.usersService.findByEmail(payload.username);
  }
}