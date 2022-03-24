import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../users.entity';
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.jwt;

    const decode = Jwt.verify(token, 'secret');
    const id = decode.id;
    const user = await UserEntity.findOne({ id });

    try {
      if (user && user.isAdmin ) {
        request.user = user;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException(); //http error
    }
  }
}
