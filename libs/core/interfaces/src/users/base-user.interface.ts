import { IBaseEntity } from './base-entity.interface';
import { UserRoles } from './user-roles.enum';

export interface IBaseUser<T = string> extends IBaseEntity<T> {
  role: UserRoles;
}
