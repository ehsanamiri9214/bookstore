import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/enums';
import { RoleService } from 'src/modules/auth/services/role/role.service';

@Injectable()
export class IsAdmin implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const adminRole = await this.roleService.find({ name: RoleEnum.ADMIN });
    if (adminRole.id === request.user.role.id) return true;
    return false;
  }
}
