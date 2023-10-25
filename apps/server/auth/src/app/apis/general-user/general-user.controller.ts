import { InvalidBodyError, JwtService } from '@bs/core';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  CreateGeneralUserRequestBody,
  CreateGeneralUserRequestResponse,
  GetGeneralUserApprovalStatusBody,
  GetGeneralUserApprovalStatusResponse,
  InvalidTokenDataError,
  RegisterNewGeneralUserBody,
  RegisterNewGeneralUserResponse,
  isNullish,
} from '@rps/bullion-interfaces';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { GeneralUserIdentityRoot } from '../../../core/validator-roots/general-user-identity.root';
import { GeneralUserInteractor } from '../../interactor/general-user/general-user.interactor';

@Controller('general-user')
export class GeneralUserController {
  constructor(
    @Inject(GeneralUserInteractor)
    private readonly generalUserInteractor: GeneralUserInteractor,
    @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshToken: JwtService,
  ) {}

  @Post('register')
  async RegisterNewGeneralUser(
    @Body() body: RegisterNewGeneralUserBody,
  ): Promise<RegisterNewGeneralUserResponse> {
    return this.generalUserInteractor.registerNewUser(
      body.bullionId,
      body.user,
    );
  }

  @Post('create-new-request')
  async CreateGeneralUserRequest(
    @Body() body: CreateGeneralUserRequestBody,
  ): Promise<CreateGeneralUserRequestResponse> {
    const user = await this.GetGeneralUserDetailsByToken(body.token);
    return this.generalUserInteractor.sendRequestForApproval(
      body.bullionId,
      user,
    );
  }

  @Post('get-approval-status')
  async GetGeneralUserApprovalStatus(
    @Body() body: GetGeneralUserApprovalStatusBody,
  ): Promise<GetGeneralUserApprovalStatusResponse> {
    const user = await this.GetGeneralUserDetailsByToken(body.token);
    return this.generalUserInteractor.getApprovalStatusAndTokens(
      user.id,
      body.bullionId,
    );
  }

  @Get('my-details')
  async GetGeneralUserDetailsByToken(@Query('token') token: string) {
    if (isNullish(token)) {
      throw new InvalidBodyError('Please Pass Valid Token');
    }
    const details =
      this.refreshToken.VerifyToken<GeneralUserIdentityRoot>(token);
    if (details.typeName !== GeneralUserIdentityRoot.name) {
      throw new InvalidTokenDataError(GeneralUserIdentityRoot.name);
    }
    return this.generalUserInteractor.findGeneralUserById(details.id);
  }
}
