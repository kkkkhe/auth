import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { CheckTokenMiddleware } from './check-token.middleware';

@Module({
  imports: [UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CheckTokenMiddleware).forRoutes('*');
  // }
}
