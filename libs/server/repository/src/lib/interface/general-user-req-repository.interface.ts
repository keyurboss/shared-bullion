import {
  BullionId,
  EntityNotFoundError,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';
import { GeneralUserReqRoot } from '@bs/validator-roots';
import { Filter } from 'mongodb';
import { CommonRepository } from './common/common-repo.interface';

export type GeneralUserReqFilter = Filter<GeneralUserReqRoot>;

export abstract class GeneralUserReqRepository extends CommonRepository<
  GeneralUserReqFilter,
  GeneralUserReqRoot,
  GeneralUserReqId
> {
  override rootName: string = GeneralUserReqRoot.name;
  abstract findOneByGeneralUserId(
    id: GeneralUserId,
    bullionId: BullionId,
  ): Promise<GeneralUserReqRoot | undefined>;
  async findOneByGeneralUserIdOrFail(
    id: GeneralUserId,
    bullionId: BullionId,
  ): Promise<GeneralUserReqRoot> {
    const entity = await this.findOneByGeneralUserId(id, bullionId);

    if (!entity) {
      throw new EntityNotFoundError({
        message: `${this.rootName} identified by generalUserId ${id} not found`,
      });
    }

    return entity;
  }
}
