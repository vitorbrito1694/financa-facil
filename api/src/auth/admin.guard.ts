import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userPayload = request.user;

    if (!userPayload || !userPayload.sub) {
      return false;
    }

    const user = await this.usersService.findOne(userPayload.sub);
    if (!user || !user.admin) {
      throw new ForbiddenException('Acesso negado. Requer privilégios de administrador.');
    }

    return true;
  }
}
