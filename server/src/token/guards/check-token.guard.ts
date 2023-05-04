import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../token.service';

@Injectable()
export class CheckTokenGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException('There is no token');
    }
    const userDto = this.tokenService.verifyAccessToken(token);

    if (!userDto) {
      throw new UnauthorizedException();
    }
    return true;
  }

  extractTokenFromHeader(req: Request): string | undefined {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      return token;
    }
    return undefined;
  }
}
