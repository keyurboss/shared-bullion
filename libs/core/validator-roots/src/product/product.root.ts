import {
  CaculationSymbole,
  CaculationSymboleValue,
  CalculatedOnPriceType,
  CalculatedOnPriceof,
  Product,
  ProductID,
  ProductShowLocation,
  SourceSymbole,
  SourceSymboleValues,
} from '@rps/bullion-interfaces';
import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsEnum, IsString, Length } from 'class-validator';
import { CshVariableSnapshotEntity } from '../calc/calc.root';
import { v4 } from 'uuid';
import { BaseEntity } from '../core/base.entity';

export type ProductDocument = Pick<
  ProductRoot,
  | 'id'
  | 'name'
  | 'sourceSymbole'
  | 'calculationSymbole'
  | 'isActive'
  | 'isHedging'
  | 'calculatedOnPriceof'
  | 'calculatedOnPriceType'
  | 'calcSnapshot'
  | 'showLocation'
  | 'createdAt'
  | 'modifiedAt'
>;
export class ProductRoot extends BaseEntity<ProductID> implements Product {
  @Expose()
  @IsString()
  @Length(1)
  name!: string;

  @Expose()
  @IsEnum(SourceSymboleValues)
  sourceSymbole!: SourceSymbole;

  @Expose()
  @IsEnum(CaculationSymboleValue)
  calculationSymbole!: CaculationSymbole;

  @Expose()
  @IsBoolean()
  isActive!: boolean;

  @Expose()
  @IsBoolean()
  isHedging!: boolean;

  @Expose()
  @IsEnum(ProductShowLocation)
  showLocation!: ProductShowLocation;

  @Expose()
  @IsEnum(CalculatedOnPriceof)
  calculatedOnPriceof!: CalculatedOnPriceof;

  @Expose()
  @IsEnum(CalculatedOnPriceType)
  calculatedOnPriceType!: CalculatedOnPriceType;

  @Expose()
  @IsEnum(CshVariableSnapshotEntity)
  calcSnapshot!: CshVariableSnapshotEntity;

  static generateID() {
    return v4() as ProductID;
  }

  static from({
    calcSnapshot,
    calculatedOnPriceType,
    calculatedOnPriceof,
    calculationSymbole,
    createdAt = new Date(),
    id,
    isActive,
    isHedging,
    modifiedAt = new Date(),
    name,
    showLocation,
    sourceSymbole,
  }: ProductDocument) {
    const entity = new ProductRoot();
    entity.id = id;
    entity.name = name;
    entity.isActive = isActive;
    entity.isHedging = isHedging;
    entity.showLocation = showLocation;
    entity.sourceSymbole = sourceSymbole;
    entity.isActive = isActive;
    entity.modifiedAt = modifiedAt;
    entity.calcSnapshot = calcSnapshot;
    entity.calculatedOnPriceType = calculatedOnPriceType;
    entity.calculatedOnPriceof = calculatedOnPriceof;
    entity.createdAt = createdAt;
    entity.calculationSymbole = calculationSymbole;
    return entity;
  }

  static fromJson(data: Record<string, unknown>) {
    const entity = plainToInstance(ProductRoot, data, {
      excludeExtraneousValues: true,
    });
    entity.validate();
    return entity;
  }
}
