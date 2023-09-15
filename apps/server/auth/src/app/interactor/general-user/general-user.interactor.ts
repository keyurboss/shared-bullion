import { JwtService } from '@bs/core';
import {
  BullionSiteInfoRepository,
  GeneralUserRepository,
  GeneralUserReqRepository,
} from '@bs/repo';
import {
  GeneralUserReqRoot,
  GeneralUserRoot,
  NewGeneralUserOptions,
} from '@bs/validator-roots';
import { Inject, Injectable } from '@nestjs/common';
import {
  rand,
  randFirstName,
  randLastName,
  randNumber,
  randPassword,
  randText,
  randUserName,
} from '@ngneat/falso';
import {
  BullionId,
  DeviceType,
  GeneralUserAuthStatus,
  GeneralUserId,
  GstNumber,
} from '@rps/bullion-interfaces';
import { v4 } from 'uuid';
import { REFRESH_TOKEN_SERVICE } from '../../../config/service.token';

@Injectable()
export class GeneralUserInteractor {
  constructor(
    @Inject(GeneralUserRepository)
    private readonly generalUserRepo: GeneralUserRepository,
    @Inject(BullionSiteInfoRepository)
    private readonly bullionSiteInfoRepo: BullionSiteInfoRepository,
    @Inject(GeneralUserReqRepository)
    private readonly generalUserReqRepository: GeneralUserReqRepository,
    @Inject(REFRESH_TOKEN_SERVICE) private readonly refreshToken: JwtService,
  ) {}

  async findGeneralUserById(id: GeneralUserId) {
    return this.generalUserRepo.findOneOrFail(id);
  }

  async registerNewUser(
    bullionId: BullionId,
    generalUserData: NewGeneralUserOptions,
  ) {
    const bullion = await this.bullionSiteInfoRepo.findOneOrFail(bullionId);
    if (bullion.generalUserInfo.autoLogin) {
      generalUserData = {
        firstName: generalUserData.firstName ?? randFirstName(),
        lastName: generalUserData.lastName ?? randLastName(),
        os: generalUserData.os ?? 'AUTO_OS',
        firmName: generalUserData.firmName ?? randUserName(),
        gstNumber: generalUserData.gstNumber ?? (randText() as GstNumber),
        contactNumber: generalUserData.contactNumber ?? randNumber(),
        randomPass: generalUserData.randomPass ?? randPassword(),
        deviceId: generalUserData.deviceId ?? v4(),
        deviceType:
          generalUserData.deviceType ?? rand(Object.values(DeviceType)),
        isAuto: true,
      };
    }
    const user = GeneralUserRoot.newFrom(generalUserData);
    await this.generalUserRepo.save(user);
    const userReq = GeneralUserReqRoot.from({
      bullionId: bullion.id,
      generalUserId: user.id,
      id: GeneralUserReqRoot.generateID(),
      status: bullion.generalUserInfo.autoApprove
        ? GeneralUserAuthStatus.Authorized
        : GeneralUserAuthStatus.Requested,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    await this.generalUserReqRepository.save(userReq);
  }

  getApprovalStatus(generalUserId: GeneralUserId, bullionId: BullionId) {
    return this.generalUserReqRepository.findOneByGeneralUserIdOrFail(
      generalUserId,
      bullionId,
    );
  }
}
