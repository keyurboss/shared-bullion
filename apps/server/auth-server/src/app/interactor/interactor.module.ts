import { Global, Module, Provider } from '@nestjs/common';
import { GeneralUserInteractor } from './general-user/general-user.interactor';

const services: Provider[] = [GeneralUserInteractor];

@Global()
@Module({
  providers: [...services],
  exports: [...services],
})
export class InterActorModule {}
