import { GeneralUserId } from '@rps/bullion-interfaces';
import {
  BaseEntity,
  GeneralUserRoot,
  TypeNameProp,
} from '@rps/bullion-validator-roots';
import { plainToInstance } from 'class-transformer';

export class GeneralUserIdentityRoot
  extends BaseEntity<GeneralUserId>
  implements TypeNameProp
{
  readonly typeName = GeneralUserIdentityRoot.name;
  static from({
    createdAt = new Date(),
    id = GeneralUserRoot.generateID(),
    modifiedAt = new Date(),
  }) {
    const entity = new GeneralUserIdentityRoot();
    entity.id = id;
    entity.modifiedAt = modifiedAt;
    entity.createdAt = createdAt;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(GeneralUserIdentityRoot, data, {
      excludeExtraneousValues: true,
    });
    entity.validate();
    return entity;
  }
}
