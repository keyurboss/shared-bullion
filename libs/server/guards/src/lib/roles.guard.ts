import { AdminRoles, isNotNullish, isNullish } from '@booz/interfaces';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Request,
  RolesNotAuthorisedError,
  RolesNotExistsError,
} from '@bs/core';

export const DefaultProtectedForRoles = Symbol('DefaultProtectedForRoles');

@Injectable()
export class RolesBasedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Optional()
    @Inject(DefaultProtectedForRoles)
    private defaultProtected = false,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    const user = request.decryptedToken;
    if (user?.roles === AdminRoles.GOD) {
      return true;
    }
    if (isNullish(roles) || roles.length === 0) {
      if (roles === null || !this.defaultProtected) {
        return true;
      }
      throw new RolesNotExistsError();
    }
    if (isNotNullish(request.tokenError)) {
      throw request.tokenError;
    }
    if (isNullish(user) || !roles.includes(user.roles)) {
      throw new RolesNotAuthorisedError();
    }
    return true;
  }
}
