import {
  BullionId,
  DeviceId,
  DeviceType,
  GeneralUserAuthStatus,
  GeneralUserId,
  GeneralUserType,
  GstNumber,
} from '@rps/bullion-interfaces';
import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../core/base.entity';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GeneralUserOptions = OmitProperties<GeneralUserRoot, Function>;

export class GeneralUserRoot
  extends BaseEntity<GeneralUserId>
  implements GeneralUserType
{
  @Expose()
  @IsString()
  firstName!: string;

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
  @IsUUID()
  bullionId!: BullionId;

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
  @IsEnum(GeneralUserAuthStatus)
  status!: GeneralUserAuthStatus;

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
    bullionId,
    status,
    contactNumber,
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
    entity.status = status;
    entity.deviceType = deviceType;
    entity.bullionId = bullionId;
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
    });
    entity.validate();
    return entity;
  }
}
