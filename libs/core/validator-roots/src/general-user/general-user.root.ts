import { Optional } from '@nestjs/common';
import {
    DeviceId,
    DeviceType,
    GeneralUserId,
    GstNumber,
    GeneralUserType,
} from '@rps/bullion-interfaces';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../core/base.entity';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GeneralUserDocument = OmitProperties<GeneralUserRoot, Function>;

export class GeneralUserRoot
  extends BaseEntity<GeneralUserId>
  implements GeneralUserType
{
  @Expose()
  @Optional()
  @IsString()
  firstName?: string;

  @Expose()
  @Optional()
  @IsString()
  lastName?: string;

  @Expose()
  @Optional()
  @IsString()
  firmName?: string;

  @Expose()
  @Optional()
  @IsNumber()
  contactNumber?: number;

  @Expose()
  @Optional()
  @IsString()
  gstNumber?: GstNumber;

  @Expose()
  @Optional()
  @IsString()
  os?: string;

  @Expose()
  @IsString()
  deviceId: DeviceId;

  @Expose()
  @IsEnum(DeviceType)
  deviceType: DeviceType;

  @Expose()
  @IsBoolean()
  isAuto: boolean;

  static generateID() {
    return v4() as GeneralUserId;
  }

  static from({
    createdAt = new Date(),
    deviceId,
    deviceType,
    id,
    isAuto,
    modifiedAt = new Date(),
    contactNumber,
    firmName,
    firstName,
    gstNumber,
    lastName,
    os,
  }: GeneralUserDocument) {
    const entity = new GeneralUserRoot();
    entity.id = id;
    entity.createdAt = createdAt;
    entity.deviceId = deviceId;
    entity.deviceType = deviceType;
    entity.id = id;
    entity.isAuto = isAuto;
    entity.modifiedAt = modifiedAt;
    entity.contactNumber = contactNumber;
    entity.firmName = firmName;
    entity.firstName = firstName;
    entity.gstNumber = gstNumber;
    entity.lastName = lastName;
    entity.os = os;
    return entity;
  }
}
