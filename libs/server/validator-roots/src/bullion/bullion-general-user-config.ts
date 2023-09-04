import { IBullionGeneralUserConfig } from '@rps/bullion-interfaces';
import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { IsBoolean } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import {
  groupDbToPlain,
  groupToPlain,
  validateSyncOrFail,
} from '../core.interface';

export type BullionGeneralUserConfigOption = OmitProperties<
  BullionGeneralUserConfigRoot,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Function
>;

export class BullionGeneralUserConfigRoot implements IBullionGeneralUserConfig {
  @Expose()
  @IsBoolean()
  autoApprove!: boolean;

  @Expose()
  @IsBoolean()
  autoLogin!: boolean;

  static from({ autoApprove, autoLogin }: BullionGeneralUserConfigOption) {
    const entity = new BullionGeneralUserConfigRoot();
    entity.autoApprove = autoApprove;
    entity.autoLogin = autoLogin;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(BullionGeneralUserConfigRoot, data, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    validateSyncOrFail(entity);
    return entity;
  }

  toJson() {
    return instanceToPlain(this, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      groups: [groupDbToPlain, groupToPlain],
    });
  }
}
