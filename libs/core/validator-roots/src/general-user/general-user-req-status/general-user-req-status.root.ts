import {
  BullionId,
  GeneralUserAuthStatus,
  GeneralUserId,
  GeneralUserReqId,
  IGeneralUserReq,
} from '@rps/bullion-interfaces';
import { Expose, plainToInstance } from 'class-transformer';
import { IsEnum, IsUUID } from 'class-validator';
import { OmitProperties } from 'ts-essentials';
import { v4 } from 'uuid';
import { BaseEntity } from '../../core';

export type GeneralUserReqOptions = OmitProperties<
  GeneralUserReqRoot,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Function
>;

export class GeneralUserReqRoot
  extends BaseEntity<GeneralUserReqId>
  implements IGeneralUserReq
{
  @Expose()
  @IsUUID()
  generalUserId!: GeneralUserId;

  @Expose()
  @IsUUID()
  bullionId!: BullionId;

  @Expose()
  @IsEnum(GeneralUserAuthStatus)
  status!: GeneralUserAuthStatus;

  static generateID() {
    return v4() as GeneralUserReqId;
  }

  static from({
    createdAt = new Date(),
    id = GeneralUserReqRoot.generateID(),
    bullionId,
    generalUserId,
    status,
    modifiedAt = new Date(),
  }: GeneralUserReqOptions) {
    const entity = new GeneralUserReqRoot();
    entity.id = id;
    entity.bullionId = bullionId;
    entity.generalUserId = generalUserId;
    entity.status = status;
    entity.modifiedAt = modifiedAt;
    entity.createdAt = createdAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(GeneralUserReqRoot, data, {
      excludeExtraneousValues: true,
    });
    entity.validate();
    return entity;
  }
}
