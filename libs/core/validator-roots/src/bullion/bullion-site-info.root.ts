import {
  IBullionGeneralUserConfig,
  BullionId,
  IBullionSiteInfo,
} from '@rps/bullion-interfaces';
import { Expose, Type, plainToInstance } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../core';
import { BullionGeneralUserConfigRoot } from './bullion-general-user-config';

export type BullionSiteInfoOptions = OmitProperties<
  BullionSiteInfoRoot,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Function
>;
export class BullionSiteInfoRoot
  extends BaseEntity<BullionId>
  implements IBullionSiteInfo
{
  @Expose()
  @IsString()
  name!: string;

  @Expose()
  @IsArray()
  @ArrayMinSize(1)
  domains!: string[];

  @Expose()
  @ValidateNested()
  @Type(() => BullionGeneralUserConfigRoot)
  generalUserInfo!: IBullionGeneralUserConfig;

  static generateID() {
    return v4() as BullionId;
  }

  static from({
    domains,
    generalUserInfo,
    name,
    createdAt = new Date(),
    id = BullionSiteInfoRoot.generateID(),
    modifiedAt = new Date(),
  }: BullionSiteInfoOptions) {
    const entity = new BullionSiteInfoRoot();
    entity.id = id;
    entity.name = name;
    entity.domains = domains;
    entity.generalUserInfo = generalUserInfo;
    entity.createdAt = createdAt;
    entity.modifiedAt = modifiedAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(BullionSiteInfoRoot, data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    entity.validate();
    return entity;
  }
}
