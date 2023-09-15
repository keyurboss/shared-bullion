import {
  DeviceId,
  DeviceType,
  GeneralUserId,
  GstNumber,
  IGeneralUser,
  UserRoles,
} from '@rps/bullion-interfaces';
import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../../core';

export type GeneralUserOptions = Omit<
  // eslint-disable-next-line @typescript-eslint/ban-types
  OmitProperties<GeneralUserRoot, Function>,
  'role'
>;

export type NewGeneralUserOptions = Omit<
  Omit<Omit<GeneralUserOptions, 'id'>, 'createdAt'>,
  'modifiedAt'
>;

export class GeneralUserRoot
  extends BaseEntity<GeneralUserId>
  implements IGeneralUser
{
  @Expose()
  role = UserRoles.GENERAL_USER;

  @Expose()
  @IsString()
  firstName!: string;

  @Expose()
  @IsString()
  randomPass!: string;

  @Expose()
  @IsString()
  lastName!: string;

  @Expose()
  @IsString()
  firmName!: string;

  @Expose()
  @IsNumber()
  contactNumber!: number;

  @Expose()
  @IsString()
  gstNumber!: GstNumber;

  @Expose()
  @IsString()
  os!: string;

  @Expose()
  @IsString()
  deviceId!: DeviceId;

  @Expose()
  @IsEnum(DeviceType)
  deviceType!: DeviceType;

  @Expose()
  @IsBoolean()
  isAuto!: boolean;

  static generateID() {
    return v4() as GeneralUserId;
  }

  static from({
    createdAt = new Date(),
    deviceId,
    deviceType,
    id = GeneralUserRoot.generateID(),
    isAuto,
    modifiedAt = new Date(),
    contactNumber,
    randomPass,
    firmName,
    firstName,
    gstNumber,
    lastName,
    os,
  }: GeneralUserOptions) {
    const entity = new GeneralUserRoot();
    entity.id = id;
    entity.os = os;
    entity.deviceId = deviceId;
    entity.deviceType = deviceType;
    entity.randomPass = randomPass;
    entity.isAuto = isAuto;
    entity.modifiedAt = modifiedAt;
    entity.contactNumber = contactNumber;
    entity.firmName = firmName;
    entity.firstName = firstName;
    entity.gstNumber = gstNumber;
    entity.lastName = lastName;
    entity.createdAt = createdAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(GeneralUserRoot, data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    entity.validate();
    return entity;
  }

  static newFrom(
    options: NewGeneralUserOptions,
    id = GeneralUserRoot.generateID(),
  ) {
    return GeneralUserRoot.from({
      ...options,
      id,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
  }
}
