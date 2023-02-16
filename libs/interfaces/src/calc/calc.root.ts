import { Expose, Type, instanceToPlain } from 'class-transformer';
import {
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  CshGenStrings,
  CshID,
  CshPremiumBuySellSnapshot,
  CshType,
} from './calc.interface';
import { groupDbToPlain, groupToPlain } from '../core';
import {
  GenerateExchangeBackwordCalcString,
  GenerateExchangeForwordCalcString,
} from '@rps/bullion-functions/core';

export class CshPremiumBuySellEntity {
  @Expose()
  @IsNumber()
  tax!: number;
  @Expose()
  @IsNumber()
  tcs!: number;
  @Expose()
  @IsNumber()
  tds!: number;
  @Expose()
  @IsNumber()
  premium!: number;
}

export class CshVariableSnapshot {
  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CshPremiumBuySellEntity)
  buy!: CshPremiumBuySellSnapshot;
  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CshPremiumBuySellEntity)
  sell!: CshPremiumBuySellSnapshot;
}

export class CalcEntity {
  @Expose()
  @IsUUID()
  CshId!: CshID;

  @Expose()
  @IsEnum(CshType)
  CshType!: CshType;

  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CshVariableSnapshot)
  CshVariableSnapshot!: CshVariableSnapshot;

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get CshForwordGenStrings(): CshGenStrings {
    if (this.CshType === CshType.fixed) {
      return {
        buy: this.CshVariableSnapshot.buy.premium.toString(),
        sell: this.CshVariableSnapshot.sell.premium.toString(),
      };
    } else {
      return {
        buy: GenerateExchangeForwordCalcString(this.CshVariableSnapshot.buy),
        sell: GenerateExchangeForwordCalcString(this.CshVariableSnapshot.sell),
      };
    }
  }

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get CshBackwordGenStrings(): CshGenStrings {
    if (this.CshType === CshType.exec) {
      return {
        buy: GenerateExchangeBackwordCalcString(this.CshVariableSnapshot.buy),
        sell: GenerateExchangeBackwordCalcString(this.CshVariableSnapshot.sell),
      };
    }
    return {
      buy: this.CshVariableSnapshot.buy.premium.toString(),
      sell: this.CshVariableSnapshot.sell.premium.toString(),
    };
  }

  toJson() {
    return instanceToPlain(this, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
      groups: [groupDbToPlain, groupToPlain],
    });
  }
}
