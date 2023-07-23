import { Global, Module } from '@nestjs/common';
import {
  BullionSiteInfoRepoProvider,
  GeneralUserRepoProvider,
  GeneralUserReqRepoProvider,
} from '@rps/buillion-server-repository';

const repositoryPorvider = [
  GeneralUserRepoProvider,
  GeneralUserReqRepoProvider,
  BullionSiteInfoRepoProvider,
];

@Global()
@Module({
  providers: [...repositoryPorvider],
  exports: [...repositoryPorvider],
})
export class RepositoryModule {}
