import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userDto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    try {
      const createdUser = await this.usersService.createUser({
        ...userDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        throw new ConflictException('Principal account already exists');
      }
      throw error; // Rethrow other errors
    }
  }
}