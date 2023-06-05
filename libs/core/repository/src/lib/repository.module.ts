import { Global, Module } from '@nestjs/common';
import {
  GeneralUserRepoProvider,
  BullionSiteInfoRepoProvider,
} from './repository.index';

const repositoryPorvider = [
  GeneralUserRepoProvider,
  BullionSiteInfoRepoProvider,
];

@Global()
@Module({
  providers: [...repositoryPorvider],
  exports: [...repositoryPorvider],
})
export class RepositoryModule {}
