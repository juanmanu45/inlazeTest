// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from './constans';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';



@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService,UserService],
  controllers: [AuthController],
})
export class AuthModule {}
