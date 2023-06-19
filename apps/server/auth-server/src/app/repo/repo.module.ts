import { Global, Module } from '@nestjs/common';
import {
  BullionSiteInfoRepoProvider,
  GeneralUserRepoProvider,
} from '@rps/buillion-server-repository';

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
