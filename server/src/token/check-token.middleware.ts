import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const access_token = req.headers['authorization'];
    console.log(access_token);
    next();
  }
}
