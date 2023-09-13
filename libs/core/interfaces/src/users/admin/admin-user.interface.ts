import { IBaseUser } from '../base-user.interface';
import { Opaque } from 'ts-essentials';
import { BullionId } from '../../bullion';
import { UserRoles } from '../user-roles.enum';

export type AdminId = Opaque<string, 'ADMIN_USER_ID'>;
export type AdminRoles =
  | UserRoles.ADMIN
  | UserRoles.SUPER_ADMIN
  | UserRoles.GOD
  | UserRoles.GOD;
export interface IAdminUser extends IBaseUser<AdminId, AdminRoles> {
  uname: string;
  displayName: string;
  password: string;
  bullionId: BullionId;
}
