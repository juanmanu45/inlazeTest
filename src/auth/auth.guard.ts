import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { jwtConstants } from './constans';
  import { Request } from 'express';
  import { UserService } from 'src/user/user.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException('No token provided.');
        }
    
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
          });
          const userEmail = payload.email;
          if (!userEmail) {
            throw new UnauthorizedException('Token is invalid.');
          }
          
          request.user = payload;
        } catch (error) {
          throw new UnauthorizedException('Token verification failed.');
        }
    
        return true;
      }

    
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }