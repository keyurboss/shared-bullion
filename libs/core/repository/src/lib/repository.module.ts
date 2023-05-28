import { Module } from '@nestjs/common';
import { GeneralUserRepoProvider } from './repository.index';

const repositoryPorvider = [GeneralUserRepoProvider];
@Module({
  providers: [...repositoryPorvider],
})
export class RepositoryModule {}
