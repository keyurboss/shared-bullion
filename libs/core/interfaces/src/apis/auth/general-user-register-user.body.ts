import { BullionId } from '../../bullion';
import { IGeneralUser } from '../../users';

export type RegisterNewGeneralUserBody = {
  bullionId: BullionId;
  user: IGeneralUser;
};
export type RegisterNewGeneralUserResponse = {
  user: IGeneralUser;
  userTokenized: string;
};
