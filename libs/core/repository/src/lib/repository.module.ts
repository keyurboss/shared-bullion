import { Module } from '@nestjs/common';
import {
  GeneralUserRepoProvider,
  BullionSiteInfoRepoProvider,
} from './repository.index';

const repositoryPorvider = [
  GeneralUserRepoProvider,
  BullionSiteInfoRepoProvider,
];
@Module({
  providers: [...repositoryPorvider],
})
export class RepositoryModule {}
