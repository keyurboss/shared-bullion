import { Expose, Type, instanceToPlain } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import * as uuid from 'uuid';

export abstract class IEvent<Payload = unknown> {
  @Expose()
  @IsString()
  _id!: string;

  @Expose()
  @IsString()
  abstract readonly typeName: string;

  @Expose()
  @IsString({ each: true })
  get types(): string[] {
    const types: string[] = [];
    let instance = Object.getPrototypeOf(this);
    let name = instance.constructor.name as string;
    while (name !== 'Object') {
      types.push(name);
      instance = Object.getPrototypeOf(instance);
      name = instance.constructor.name;
    }
    return types;
  }

  @Expose()
  @IsOptional()
  payload!: Payload;

  @Expose()
  @Type(() => Date)
  occurredAt = new Date();

  abstract get key(): string;

  static generateId() {
    return uuid.v4();
  }

  toJson() {
    return instanceToPlain(this, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
