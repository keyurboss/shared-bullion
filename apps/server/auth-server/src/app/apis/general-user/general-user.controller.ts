import { Controller, Get, Inject, Query } from '@nestjs/common';
import { GeneralUserRepository } from '@rps/buillion-server-repository';
import { InvalidTokenDataError } from '@rps/bullion-interfaces';
import { JwtService } from '@rps/bullion-server-core';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { IGeneralUserIdentityRoot } from '../../../core/validator-roots/general-user-identity.root';

@Controller('general-user')
export class GeneralUserController {
  constructor(
    private readonly generalUserRepo: GeneralUserRepository,
    @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshToken: JwtService,
  ) {}

  @Get('my-details')
  async GetGeneralUserDetailsByToken(@Query('token') token: string) {
    const details =
      this.refreshToken.VerifyToken<IGeneralUserIdentityRoot>(token);
    if (details.typeName !== IGeneralUserIdentityRoot.name) {
      throw new InvalidTokenDataError(IGeneralUserIdentityRoot.name);
    }
    return this.generalUserRepo.findOneOrFail(details.id);
  }
}
