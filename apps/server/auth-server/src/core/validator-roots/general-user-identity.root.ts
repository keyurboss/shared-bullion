import { GeneralUserId } from '@rps/bullion-interfaces';
import {
  BaseEntity,
  GeneralUserRoot,
  TypeNameProp,
} from '@rps/bullion-validator-roots';
import { plainToInstance } from 'class-transformer';

export class IGeneralUserIdentityRoot
  extends BaseEntity<GeneralUserId>
  implements TypeNameProp
{
  readonly typeName = IGeneralUserIdentityRoot.name;
  static from({
    createdAt = new Date(),
    id = GeneralUserRoot.generateID(),
    modifiedAt = new Date(),
  }) {
    const entity = new IGeneralUserIdentityRoot();
    entity.id = id;
    entity.modifiedAt = modifiedAt;
    entity.createdAt = createdAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(IGeneralUserIdentityRoot, data, {
      excludeExtraneousValues: true,
    });
    entity.validate();
    return entity;
  }
}
