import { AdminRoot } from '@bs/validator-roots';
import { AdminId } from '@rps/bullion-interfaces';
import { Filter } from 'mongodb';
import { CommonRepository } from './common/common-repo.interface';

export type AdminFilter = Filter<AdminRoot>;

export abstract class AdminsRepository extends CommonRepository<
  AdminFilter,
  AdminRoot,
  AdminId
> {
  override rootName: string = AdminRoot.name;
}
