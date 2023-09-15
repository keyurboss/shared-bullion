import {
  GeneralUserReqExists,
  GeneralUserReqNotFound,
  GeneralUserReqPending,
  GeneralUserReqRejected,
  JwtService,
} from '@bs/core';
import {
  BullionSiteInfoRepository,
  GeneralUserRepository,
  GeneralUserReqRepository,
} from '@bs/repo';
import {
  BullionSiteInfoRoot,
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
  GeneralUserReqId,
  GstNumber,
  isNotNullish,
} from '@rps/bullion-interfaces';
import { v4 } from 'uuid';
import {
  ACCESS_TOKEN_SERVICE,
  REFRESH_TOKEN_SERVICE,
} from '../../../config/service.token';
import { GeneralUserIdentityRoot } from '../../../core/validator-roots/general-user-identity.root';

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
    @Inject(ACCESS_TOKEN_SERVICE) private readonly accessToken: JwtService,
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
    return this.createRequest(bullion, user);
  }

  async sendRequestForApproval(bullionId: BullionId, user: GeneralUserRoot) {
    const bullion = await this.bullionSiteInfoRepo.findOneOrFail(bullionId);
    return this.createRequest(bullion, user);
  }

  private async createRequest(
    bullion: BullionSiteInfoRoot,
    user: GeneralUserRoot,
  ) {
    const existingReq =
      await this.generalUserReqRepository.findOneByGeneralUserId(
        user.id,
        bullion.id,
      );
    if (isNotNullish(existingReq)) {
      throw new GeneralUserReqExists();
    }
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

    return {
      user,
      userTokenized: this.refreshToken.SignData(
        GeneralUserIdentityRoot.from({
          id: user.id,
          createdAt: user.createdAt,
          modifiedAt: user.modifiedAt,
        }),
      ),
    };
  }

  async changeReqStatus(id: GeneralUserReqId, status: GeneralUserAuthStatus) {
    const userReq = await this.generalUserReqRepository.findOneOrFail(id);
    userReq.status = status;
    await this.generalUserReqRepository.save(userReq);
  }

  async getApprovalStatus(generalUserId: GeneralUserId, bullionId: BullionId) {
    try {
      const reqObject =
        await this.generalUserReqRepository.findOneByGeneralUserIdOrFail(
          generalUserId,
          bullionId,
        );
      if (reqObject.status === GeneralUserAuthStatus.Requested) {
        throw new GeneralUserReqPending();
      }
      if (reqObject.status === GeneralUserAuthStatus.Rejected) {
        throw new GeneralUserReqRejected();
      }
      return reqObject;
    } catch {
      throw new GeneralUserReqNotFound();
    }
  }

  async getApprovalStatusAndTokens(
    generalUserId: GeneralUserId,
    bullionId: BullionId,
  ) {
    const user = await this.getApprovalStatus(generalUserId, bullionId);
    return this.generateToken(user);
  }

  verifyAndGenerateNewAccessToken(token: string) {
    const userReq = this.refreshToken.VerifyToken<GeneralUserReqRoot>(token);
    const req = this.getApprovalStatus(
      userReq.generalUserId,
      userReq.bullionId,
    );
    return {
      accessToken: this.accessToken.SignData(req, { expiresIn: '1h' }),
    };
  }

  generateToken(root: GeneralUserReqRoot | GeneralUserRoot) {
    return {
      refreshToken: this.refreshToken.SignData(root),
      accessToken: this.accessToken.SignData(root, { expiresIn: '1h' }),
    };
  }
}
