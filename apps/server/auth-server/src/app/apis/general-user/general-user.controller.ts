import { Controller, Get, Inject, Query } from '@nestjs/common';
import { InvalidTokenDataError } from '@rps/bullion-interfaces';
import { JwtService } from '@rps/bullion-server-core';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { GeneralUserIdentityRoot } from '../../../core/validator-roots/general-user-identity.root';
import { GeneralUserInteractor } from '../../interactor/general-user/general-user.interactor';

@Controller('general-user')
export class GeneralUserController {
  constructor(
    @Inject(GeneralUserInteractor)
    private readonly generalUserRepo: GeneralUserInteractor,
    @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshToken: JwtService,
  ) {}

  @Get('my-details')
  async GetGeneralUserDetailsByToken(@Query('token') token: string) {
    const details =
      this.refreshToken.VerifyToken<GeneralUserIdentityRoot>(token);
    if (details.typeName !== GeneralUserIdentityRoot.name) {
      throw new InvalidTokenDataError(GeneralUserIdentityRoot.name);
    }
    return this.generalUserRepo.findGeneralUserByid(details.id);
  }
  // @Post("")
}
