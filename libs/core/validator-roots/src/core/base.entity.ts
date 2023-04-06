import { Expose, Type, instanceToPlain } from 'class-transformer';
import { IsUUID } from 'class-validator';
import {
  groupToPlain,
  groupDbToPlain,
  validateSyncOrFail,
} from '../core.interface';
import { v4 } from 'uuid';
export class BaseEntity<T> {
  @Expose()
  @IsUUID()
  Id!: T;

  @Expose()
  @Type(() => Date)
  createdAt: Date = new Date();

  @Expose()
  @Type(() => Date)
  modifiedAt: Date = new Date();

  toJson() {
    return instanceToPlain(this, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      groups: [groupDbToPlain, groupToPlain],
    });
  }
  validate() {
    validateSyncOrFail(this);
  }
}
