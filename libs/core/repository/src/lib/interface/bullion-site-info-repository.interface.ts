import { BullionId } from '@rps/bullion-interfaces';
import {
  BullionSiteInfoOptions,
  BullionSiteInfoRoot,
} from '@rps/bullion-validator-roots';
import { Filter } from 'mongodb';
import { CommonRepository } from './common/common-repo.interface';

export type BullionSiteInfoFilter = Filter<BullionSiteInfoOptions>;

export abstract class BullionSiteInfoRepository extends CommonRepository<
  BullionSiteInfoFilter,
  BullionSiteInfoRoot,
  BullionId
> {
  override rootName: string = BullionSiteInfoRoot.name;
}
