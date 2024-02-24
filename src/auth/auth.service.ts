import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService:UserService,private jwtService: JwtService
  ) {}

  async signIn(logInDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneEmail(logInDto.email);
    if (!user) {
      throw new NotFoundException(`Usuario con Email ${logInDto.email} no encontrado`);
    }

    const isPasswordMatching = await bcrypt.compare(logInDto.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }

    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}