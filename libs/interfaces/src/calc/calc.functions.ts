import { TransformFnParams } from 'class-transformer';

const ForwordExchangeBaseString = '({{symbole}}+{{premium}})*(1+({{tax}}/100))';
const BackwordExchangeBaseString = '({{price}}/(1+({{tax}}/100)))-{{premium}}';

export function GenerateExchangeForwordCalcString(d: Record<string, number>) {
  return Object.keys(d).reduce((pv, cv) => {
    return pv.replace(new RegExp(`{{${cv}}}`, 'gmi'), (d[cv] ?? 0).toString());
  }, ForwordExchangeBaseString);
}
export function GenerateExchangeBackwordCalcString(d: Record<string, number>) {
  return Object.keys(d).reduce((pv, cv) => {
    return pv.replace(new RegExp(`{{${cv}}}`, 'gmi'), (d[cv] ?? 0).toString());
  }, BackwordExchangeBaseString);
}
export const transformTimestampToDate = ({ value }: TransformFnParams) =>
  new Date(value * 1000);
export const transformDateToTimestamp = ({ value }: TransformFnParams) =>
  Math.floor(value.getTime() / 1000);
export const timeStampToDate = (stamp: number) => new Date(stamp * 1000);
export const dateToTimestamp = (d: Date) => Math.floor(d.getTime() / 1000);
