import {
  CalculatedOnPriceof,
  CshGenStrings,
  CshID,
  CshPremiumBuySellSnapshot,
  CshVariableSnapshot,
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
import { BaseEntity } from '../core/base.entity';
import { DeepOmit } from 'ts-essentials';
import { v4 } from 'uuid';
import { groupDbToPlain, groupToPlain } from '../core.interface';

export class CshPremiumBuySellEntity implements CshPremiumBuySellSnapshot {
  tcs = 0;
  tds = 0;
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
  'id' | 'type' | 'variableSnapshot' | 'createdAt' | 'modifiedAt'
>;
export class CalcEntity extends BaseEntity<CshID> {
  @Expose()
  @IsEnum(CalculatedOnPriceof)
  type!: CalculatedOnPriceof;

  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CshVariableSnapshotEntity)
  variableSnapshot!: CshVariableSnapshotEntity;

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get ForwordGenStrings(): CshGenStrings {
    if (this.type === CalculatedOnPriceof.FIX) {
      return {
        buy: this.variableSnapshot.buy.premium.toString(),
        sell: this.variableSnapshot.sell.premium.toString(),
      };
    } else {
      return {
        buy: GenerateExchangeForwordCalcString(this.variableSnapshot.buy),
        sell: GenerateExchangeForwordCalcString(this.variableSnapshot.sell),
      };
    }
  }

  @Expose({
    groups: [groupDbToPlain, groupToPlain],
  })
  get BackwordGenStrings(): CshGenStrings {
    if (this.type === CalculatedOnPriceof.FIX) {
      return {
        buy: this.variableSnapshot.buy.premium.toString(),
        sell: this.variableSnapshot.sell.premium.toString(),
      };
    }

    return {
      buy: GenerateExchangeBackwordCalcString(this.variableSnapshot.buy),
      sell: GenerateExchangeBackwordCalcString(this.variableSnapshot.sell),
    };
  }

  static generateID() {
    return v4() as CshID;
  }

  static from({
    id = v4() as CshID,
    type,
    variableSnapshot,
    createdAt,
    modifiedAt,
  }: CalcEntityOptions) {
    const entity = new CalcEntity();
    entity.id = id;
    entity.type = type;
    entity.variableSnapshot = variableSnapshot;
    entity.createdAt = createdAt;
    entity.modifiedAt = modifiedAt;
    return entity;
  }

  static updateEntity(
    options: Omit<CalcEntityOptions, 'modifiedAt'>,
    modifiedAt = new Date(),
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
    id = CalcEntity.generateID(),
  ) {
    return CalcEntity.updateEntity({
      ...options,
      createdAt,
      id,
    });
  }
}
