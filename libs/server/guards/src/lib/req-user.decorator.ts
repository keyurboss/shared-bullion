import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from '@bs/core';
import { IGeneralUser } from '@rps/bullion-interfaces';

export const ReqUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    // get roles metadata from @Controller class
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request<IGeneralUser>>();
    // if(req.decryptedToken)

    if (req.decryptedToken?.role) {
      //   if (AdminRolesObject.includes(req.decryptedToken?.role as AdminRoles)) {
      //     return AdminRoot.fromJson(req.decryptedToken);
      //   } else if (
      //     ManagerRoleObject.includes(req.decryptedToken.role as ManagerRole)
      //   ) {
      //     return ManagerUserRoot.fromJson(req.decryptedToken);
      //   }
    }
    return req.decryptedToken;
  },
);
