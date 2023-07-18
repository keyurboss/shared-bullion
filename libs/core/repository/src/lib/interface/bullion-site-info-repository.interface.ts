import { BullionId, EntityNotFoundError } from '@rps/bullion-interfaces';
import {
  BullionSiteInfoOptions,
  BullionSiteInfoRoot,
} from '@rps/bullion-validator-roots';
import { Filter } from 'mongodb';

export type BullionSiteInfoFilter = Filter<BullionSiteInfoOptions>;

export abstract class BullionSiteInfoRepository {
  abstract find(filter?: BullionSiteInfoFilter): Promise<BullionSiteInfoRoot[]>;
  abstract findByIds(ids: Array<BullionId>): Promise<BullionSiteInfoRoot[]>;

  abstract findOne(id: BullionId): Promise<BullionSiteInfoRoot | undefined>;

  abstract save(entity: BullionSiteInfoRoot): Promise<void>;

  async findOneOrFail(id: BullionId): Promise<BullionSiteInfoRoot> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new EntityNotFoundError({
        message: `${BullionSiteInfoRoot.name} identified by serial ${id} not found`,
      });
    }

    return entity;
  }
}
