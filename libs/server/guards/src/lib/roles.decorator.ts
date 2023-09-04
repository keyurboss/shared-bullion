// import { SetMetadata } from '@nestjs/common';
// import {
//   AdminRoles,
//   AdminRolesObject,
//   ManagerRole,
//   ManagerRoleObject,
// } from '@booz/interfaces';

// export type AllRoles = ManagerRole | AdminRoles;

// export const Roles = (...roles: AllRoles[]) => SetMetadata('roles', roles);

// export const ApiAllowAny = () => SetMetadata('roles', null);

// export const ApiAllowOnlyManagersRoles = () =>
//   SetMetadata('roles', ManagerRoleObject);

// export const ApiAllowAllRoles = () =>
//   SetMetadata('roles', [...ManagerRoleObject, ...AdminRolesObject]);

// export const ApiAllowOnlyRegionalRoles = () =>
//   SetMetadata('roles', [ManagerRole.REGIONAL]);

// export const ApiAllowOnlyNonRegionalManagerRoles = () =>
//   SetMetadata('roles', [
//     ManagerRole.COUNTER,
//     ManagerRole.FLEET,
//     ManagerRole.GOSPOTMANAGER,
//   ]);

// export const OnlyCounterRole = () =>
//   SetMetadata('roles', [
//     ManagerRole.COUNTER,
//     ManagerRole.GOSPOTMANAGER,
//     ManagerRole.REGIONAL,
//   ]);
// export const OnlyFleetRole = () =>
//   SetMetadata('roles', [
//     ManagerRole.FLEET,
//     ManagerRole.GOSPOTMANAGER,
//     ManagerRole.REGIONAL,
//   ]);

// export const OnlySuperAdmin = () =>
//   SetMetadata('roles', [AdminRoles.SUPER_ADMIN, AdminRoles.GOD]);

// export const OnlyAdmins = () =>
//   SetMetadata('roles', [
//     AdminRoles.ADMIN,
//     AdminRoles.SUPER_ADMIN,
//     AdminRoles.GOD,
//   ]);
