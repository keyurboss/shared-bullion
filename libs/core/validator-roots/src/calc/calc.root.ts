import {
  CshGenStrings,
  CshID,
  CshPremiumBuySellSnapshot,
  GenerateExchangeBackwordCalcString,
  GenerateExchangeForwordCalcString,
} from '@rps/bullion-interfaces';
import { Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import {
  CalculatedOnPriceof,
  CshVariableSnapshot,
} from '@rps/bullion-interfaces/calc';
import { groupDbToPlain, groupToPlain } from '../core.interface';
import { BaseEntity } from '../core/base.entity';
import { v4 } from 'uuid';
import { DeepOmit } from 'ts-essentials';

export class CshPremiumBuySellEntity implements CshPremiumBuySellSnapshot {
  @Expose()
  @IsNumber()
  tax!: number;

  @Expose()
  @IsNumber()
  premium!: number;
}

export class CshVariableSnapshotEntity implements CshVariableSnapshot {
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

export type CalcEntityOptions = Pick<
  CalcEntity,
  'Id' | 'Type' | 'VariableSnapshot' | 'createdAt' | 'modifiedAt'
>;
export class CalcEntity extends BaseEntity<CshID> {
  @Expose()
  @IsEnum(CalculatedOnPriceof)
  Type!: CalculatedOnPriceof;

  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CshVariableSnapshotEntity)
  VariableSnapshot!: CshVariableSnapshotEntity;

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get ForwordGenStrings(): CshGenStrings {
    if (this.Type === CalculatedOnPriceof.FIX) {
      return {
        buy: this.VariableSnapshot.buy.premium.toString(),
        sell: this.VariableSnapshot.sell.premium.toString(),
      };
    } else {
      return {
        buy: GenerateExchangeForwordCalcString(this.VariableSnapshot.buy),
        sell: GenerateExchangeForwordCalcString(this.VariableSnapshot.sell),
      };
    }
  }

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get BackwordGenStrings(): CshGenStrings {
    if (this.Type === CalculatedOnPriceof.FIX) {
      return {
        buy: this.VariableSnapshot.buy.premium.toString(),
        sell: this.VariableSnapshot.sell.premium.toString(),
      };
    }

    return {
      buy: GenerateExchangeBackwordCalcString(this.VariableSnapshot.buy),
      sell: GenerateExchangeBackwordCalcString(this.VariableSnapshot.sell),
    };
  }
  static generateID() {
    return v4() as CshID;
  }

  static from({
    Id = v4() as CshID,
    Type,
    VariableSnapshot,
    createdAt,
    modifiedAt,
  }: CalcEntityOptions) {
    const entity = new CalcEntity();
    entity.Id = Id;
    entity.Type = Type;
    entity.VariableSnapshot = VariableSnapshot;
    entity.createdAt = createdAt;
    entity.modifiedAt = modifiedAt;
    return entity;
  }
  static updateEntity(
    options: Omit<CalcEntityOptions, 'modifiedAt'>,
    modifiedAt = new Date()
  ) {
    return CalcEntity.from({
      ...options,
      modifiedAt,
    });
  }
  static createEntity(
    options: DeepOmit<
      CalcEntityOptions,
      {
        createdAt: true;
        modifiedAt: true;
        Id: true;
      }
    >,
    createdAt = new Date(),
    Id = CalcEntity.generateID()
  ) {
    return CalcEntity.updateEntity({
      ...options,
      createdAt,
      Id,
    });
  }
}
