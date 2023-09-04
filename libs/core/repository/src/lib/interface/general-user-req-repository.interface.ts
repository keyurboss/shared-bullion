import {
  EntityNotFoundError,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';
import { GeneralUserReqRoot } from '@rps/bullion-validator-roots';
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
  ): Promise<GeneralUserReqRoot | undefined>;
  async findOneByGeneralUserIdOrFail(
    id: GeneralUserId,
  ): Promise<GeneralUserReqRoot> {
    const entity = await this.findOneByGeneralUserId(id);

    if (!entity) {
      throw new EntityNotFoundError({
        message: `${this.rootName} identified by generalUserId ${id} not found`,
      });
    }

    return entity;
  }
}
