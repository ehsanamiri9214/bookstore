import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleEnum } from 'src/enums';
import { RoleService } from 'src/modules/auth/services/role/role.service';

@Injectable()
export class IsSupport implements CanActivate {
  constructor(private readonly roleService: RoleService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const supportRole = await this.roleService.find({ name: RoleEnum.SUPPORT });
    if (supportRole.id === request.user.role.id) return true;
    return false;
  }
}
