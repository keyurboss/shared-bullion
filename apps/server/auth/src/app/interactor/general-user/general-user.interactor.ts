import { Inject, Injectable } from '@nestjs/common';
import { GeneralUserRepository } from '@bs/repo';
import { JwtService } from '@bs/core';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';
import { GeneralUserId } from '@rps/bullion-interfaces';

@Injectable()
export class GeneralUserInteractor {
  constructor(
    private readonly generalUserRepo: GeneralUserRepository,
    @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshToken: JwtService,
  ) {}

  async findGeneralUserById(id: GeneralUserId) {
    return this.generalUserRepo.findOneOrFail(id);
  }
}
