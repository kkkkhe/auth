import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = this.tokenService.verifyAccessToken(token);

    req['user'] = payload;

    return true;
  }

  extractTokenFromHeader(req: Request) {
    console.log(req.headers.authorization.split(' '))
    const [type, token] = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : [];
    return type == 'Bearer' ? token : undefined;
  }
}
