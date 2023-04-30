import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class RefreshGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = req.session.refresh_token;
    if (token) {
      return true;
    }
  }
}
