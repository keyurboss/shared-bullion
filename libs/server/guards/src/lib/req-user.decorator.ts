// import { ExecutionContext, createParamDecorator } from '@nestjs/common';
// import { Request } from '@bs/core';
// import {
//   AdminRoles,
//   AdminRolesObject,
//   IAdmin,
//   IManagerUser,
//   ManagerRole,
//   ManagerRoleObject,
// } from '@booz/interfaces';
// import { AdminRoot, ManagerUserRoot } from '@bs/validator-root';

// export const ReqUser = createParamDecorator(
//   (_: unknown, ctx: ExecutionContext) => {
//     // get roles metadata from @Controller class
//     const http = ctx.switchToHttp();
//     const req = http.getRequest<Request<IAdmin | IManagerUser>>();
//     // if(req.decryptedToken)
//     if (req.decryptedToken?.roles) {
//       if (AdminRolesObject.includes(req.decryptedToken?.roles as AdminRoles)) {
//         return AdminRoot.fromJson(req.decryptedToken);
//       } else if (
//         ManagerRoleObject.includes(req.decryptedToken.roles as ManagerRole)
//       ) {
//         return ManagerUserRoot.fromJson(req.decryptedToken);
//       }
//     }
//     return req.decryptedToken;
//   }
// );
