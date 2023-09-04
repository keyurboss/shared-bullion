import { GeneralUserId } from '@rps/bullion-interfaces';
import { GeneralUserRoot } from '@bs/validator-roots';
import { Filter } from 'mongodb';
import { CommonRepository } from './common/common-repo.interface';

export type GeneralUserFilter = Filter<GeneralUserRoot>;

export abstract class GeneralUserRepository extends CommonRepository<
  GeneralUserFilter,
  GeneralUserRoot,
  GeneralUserId
> {
  override rootName: string = GeneralUserRoot.name;
}
