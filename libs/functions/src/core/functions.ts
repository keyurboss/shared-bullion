import { TransformFnParams } from 'class-transformer';

export const transformTimestampToDate = ({ value }: TransformFnParams) =>
  new Date(value * 1000);
export const transformDateToTimestamp = ({ value }: TransformFnParams) =>
  Math.floor(value.getTime() / 1000);
export const timeStampToDate = (stamp: number) => new Date(stamp * 1000);
export const dateToTimestamp = (d: Date) => Math.floor(d.getTime() / 1000);
