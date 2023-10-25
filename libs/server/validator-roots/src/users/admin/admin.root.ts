import {
  AdminId,
  AdminRoles,
  BullionId,
  IAdminUser,
  UserRoles,
} from '@rps/bullion-interfaces';
import { Expose, plainToInstance } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../../core';

// eslint-disable-next-line @typescript-eslint/ban-types
export type AdminOptions = OmitProperties<AdminRoot, Function>;

export class AdminRoot extends BaseEntity<AdminId> implements IAdminUser {
  @Expose()
  @IsString()
  uname!: string;

  @Expose()
  @IsString()
  displayName!: string;

  @Expose()
  @IsString()
  password!: string;

  @Expose()
  @IsUUID()
  bullionId!: BullionId;

  @Expose()
  @IsEnum(UserRoles)
  role!: AdminRoles;

  static generateID() {
    return v4() as AdminId;
  }

  static from({
    id = AdminRoot.generateID(),
    createdAt = new Date(),
    modifiedAt = new Date(),
    bullionId,
    displayName,
    password,
    role,
    uname,
  }: AdminOptions) {
    const entity = new AdminRoot();
    entity.id = id;
    entity.bullionId = bullionId;
    entity.displayName = displayName;
    entity.password = password;
    entity.role = role;
    entity.uname = uname;
    entity.modifiedAt = modifiedAt;
    entity.createdAt = createdAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(AdminRoot, data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    entity.validate();
    return entity;
  }
}
