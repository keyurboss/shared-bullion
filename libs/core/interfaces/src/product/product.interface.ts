import { Opaque } from 'ts-essentials';
// import { JSONObjectKeyAndTypeValidator } from 'rps-jsonvalidator';
// import { BooleanNumberCheckRegex } from '../core/Env.interface';
import { RateBaseSymboles } from '../core/rates';
import {
  CshVariableSnapshot,
  CalculatedOnPriceof,
} from '../calc/calc.interface';

export type SourceSymbole = RateBaseSymboles.GOLD | RateBaseSymboles.SILVER;
export const SourceSymboleValues = [
  RateBaseSymboles.GOLD,
  RateBaseSymboles.SILVER,
];
export type CaculationSymbole =
  | RateBaseSymboles.GOLD
  | RateBaseSymboles.SILVER
  | RateBaseSymboles.GOLD_MCX
  | RateBaseSymboles.SILVER_MCX;

export const CaculationSymboleValue = [
  RateBaseSymboles.GOLD,
  RateBaseSymboles.SILVER,
  RateBaseSymboles.GOLD_MCX,
  RateBaseSymboles.SILVER_MCX,
];

export enum ProductShowLocation {
  MCX = 'MCX',
  COMEX = 'COMEX',
  Product = 'Product',
}

export enum CalculatedOnPriceType {
  BID_ASK,
  BID,
  ASK,
}

export type ProductID = Opaque<string, 'ProductID'>;

export interface IProduct {
  id: ProductID;
  name: string;
  sourceSymbole: SourceSymbole;
  calculationSymbole: CaculationSymbole;
  isActive: boolean;
  isHedging: boolean;
  showLocation: ProductShowLocation;
  calculatedOnPriceof: CalculatedOnPriceof;
  calculatedOnPriceType: CalculatedOnPriceType;
  calcSnapshot: CshVariableSnapshot;
  createdAt: Date;
  modifiedAt: Date;
}

// export interface ProductList {
//   pid?: number;
//   pl_name: string;
//   pl_name_alias?: string;
//   pl_base_symbole: string;
//   pl_calculated_on: string;
//   pl_is_calculated: 0 | 1;
//   pl_is_active: 0 | 1;
//   pl_hedging: 0 | 1;
//   pl_csh_id: number;
//   pl_number_tofix: number;
//   pl_show_in: 'comex' | 'product' | 'base';
//   pl_created_at?: number;
// }

// export const ProductListUpdateReqValidator: JSONObjectKeyAndTypeValidator[] = [
//   {
//     key: 'pid',
//     required: true,
//     type: 'number',
//   },
//   {
//     key: 'pl_name',
//     required: false,
//     type: 'string',
//   },
//   {
//     key: 'pl_base_symbole',
//     required: false,
//     type: 'string',
//   },
//   {
//     key: 'pl_calculated_on',
//     required: false,
//     type: 'string',
//   },
//   {
//     key: 'pl_is_calculated',
//     required: false,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_is_active',
//     required: false,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_hedging',
//     required: false,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_csh_id',
//     required: false,
//     type: 'number',
//   },
//   {
//     key: 'pl_number_tofix',
//     required: false,
//     type: 'number',
//   },
//   {
//     key: 'pl_show_in',
//     required: false,
//     type: 'string',
//     regex: /^comex|product|base$/,
//   },
//   {
//     key: 'pl_created_at',
//     required: false,
//     type: 'number',
//   },
// ];
// export const ProductListReqValidator: JSONObjectKeyAndTypeValidator[] = [
//   {
//     key: 'pid',
//     required: false,
//     type: 'number',
//   },
//   {
//     key: 'pl_name',
//     required: true,
//     type: 'string',
//   },
//   {
//     key: 'pl_base_symbole',
//     required: true,
//     type: 'string',
//   },
//   {
//     key: 'pl_calculated_on',
//     required: false,
//     type: 'string',
//   },
//   {
//     key: 'pl_is_calculated',
//     required: true,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_is_active',
//     required: true,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_hedging',
//     required: true,
//     type: 'number',
//     regex: BooleanNumberCheckRegex,
//   },
//   {
//     key: 'pl_csh_id',
//     required: false,
//     type: 'number',
//   },
//   {
//     key: 'pl_number_tofix',
//     required: true,
//     type: 'number',
//   },
//   {
//     key: 'pl_show_in',
//     required: true,
//     type: 'string',
//     regex: /^comex|product|base$/,
//   },
//   {
//     key: 'pl_created_at',
//     required: false,
//     type: 'number',
//   },
// ];

// export const CalcHistoryReqValidator: JSONObjectKeyAndTypeValidator[] = [
//   {
//     key: 'csh_id',
//     required: false,
//     type: 'number',
//   },
//   {
//     key: 'csh_calc_base_id',
//     required: true,
//     type: 'number',
//     regex: /1|2|3/,
//   },
//   {
//     key: 'csh_variable_snapshot',
//     required: true,
//     type: 'object',
//     Extra: [
//       {
//         key: 'sell',
//         required: true,
//         type: 'object',
//       },
//       {
//         key: 'buy',
//         required: true,
//         type: 'object',
//       },
//     ],
//   },
//   {
//     key: 'csh_gen_strings',
//     required: true,
//     type: 'object',
//     Extra: [
//       {
//         key: 'sell',
//         required: true,
//         type: 'string',
//       },
//       {
//         key: 'buy',
//         required: true,
//         type: 'string',
//       },
//     ],
//   },
// ];
// export interface CalcHistory {
//   csh_id?: number;
//   csh_calc_base_id?: number;
//   csh_variable_snapshot?: {
//     buy?: {
//       [key: string]: number;
//     };
//     sell?: {
//       [key: string]: number;
//     };
//   };
//   csh_gen_strings: {
//     buy: string;
//     sell: string;
//   };
//   csh_created_on?: number;
// }

// export interface CalcBase {
//   calc_base_id?: number;
//   calc_base_name: string;
//   calc_base_variables: string[];
//   calc_base_string: string;
//   calc_base_created_at?: number;
// }
// export interface ProductListReq {
//   pid?: string | string[];
//   pl_name_like?: string;
//   pl_calculated_on_like?: string;
//   join_calc?: 'true' | 'false';
//   pl_base_symbole_like?: string;
//   pl_is_calculated?: 0 | 1 | [0, 1];
//   pl_is_active?: 0 | 1 | [0, 1];
//   pl_hedging?: 0 | 1 | [0, 1];
//   pl_csh_id?: string | string[];
//   pl_number_tofix?: string | string[];
//   pl_show_in?: 'comex' | 'product' | 'base' | ['comex', 'product', 'base'];
// }

// export type FirebaseProductList = ProductList &
//   CalcHistory &
//   CalcBase & {
//     pid: number;
//   };

// export const ProductListTable = {
//   table: 'ProductList',
//   colums: {
//     pid: 'pid',
//     pl_name: 'pl_name',
//     pl_calculated_on: 'pl_calculated_on',
//     pl_base_symbole: 'pl_base_symbole',
//     pl_is_calculated: 'pl_is_calculated',
//     pl_is_active: 'pl_is_active',
//     pl_hedging: 'pl_hedging',
//     pl_csh_id: 'pl_csh_id',
//     pl_number_tofix: 'pl_number_tofix',
//     pl_show_in: 'pl_show_in',
//     pl_created_at: 'pl_created_at',
//   },
// };
// export const CalcStringHistoryTable = {
//   table: 'CalcStringsHistory',
//   colums: {
//     csh_id: 'csh_id',
//     csh_calc_base_id: 'csh_calc_base_id',
//     csh_variable_snapshot: 'csh_variable_snapshot',
//     csh_gen_string: 'csh_gen_string',
//     csh_created_on: 'csh_created_on',
//   },
// };
// export interface BankCalcSnapshotInterface {
//   [key: string]: {
//     replace: string;
//     snapshot: {
//       [r: string]: any;
//     };
//   };
// }
// export const UpdateBankRateCalcReqValidaot: JSONObjectKeyAndTypeValidator[] = [
//   {
//     key: 'GOLD_SPOT',
//     required: false,
//     type: 'object',
//     Extra: [
//       {
//         key: 'replace',
//         type: 'string',
//         required: true,
//       },
//       {
//         key: 'snapshot',
//         type: 'object',
//         required: true,
//       },
//     ],
//   },
//   {
//     key: 'SILVER_SPOT',
//     required: false,
//     type: 'object',
//     Extra: [
//       {
//         key: 'replace',
//         type: 'string',
//         required: true,
//       },
//       {
//         key: 'snapshot',
//         type: 'object',
//         required: true,
//       },
//     ],
//   },
// ];
// export const CalcBaseTable = {
//   table: 'CalcBase',
//   colums: {
//     calc_base_id: 'calc_base_id',
//     calc_base_name: 'calc_base_name',
//     calc_base_variables: 'calc_base_variables',
//     calc_base_string: 'calc_base_string',
//     calc_base_created_at: 'calc_base_created_at',
//   },
// };

// // export interface ProductGroupMapping {
// //   pgm_id?: number;
// //   pgm_pid?: number;
// //   pgm_gid?: number;
// //   p_is_active?: number;
// //   p_is_trading_available: 0 | 1;
// //   p_extra: {
// //     volumes: {
// //       start: number;
// //       steps: number;
// //       end: number;
// //     };
// //     replace: {
// //       [key: string]: string;
// //     };
// //   };
// //   pgm_edited_on?: number;
// // }
// export type ProductGroupMapAllData = ProductGroupMapping & ProductList;
// export interface ProductGroupMappingReq {
//   pgm_id?: string | string[];
//   pgm_pid?: string | string[];
//   base_symbole?: string | string[];
//   join_product?: 'true' | 'false';
//   join_group?: 'true' | 'false';
//   pgm_gid?: string | string[];
//   p_is_active?: 0 | 1 | [0, 1];
//   p_is_trading_available?: 0 | 1 | [0, 1];
// }
// export interface ProductGroupMapping {
//   pgm_id?: number;
//   pgm_pid: number;
//   pgm_gid: number;
//   p_is_active: 0 | 1;
//   p_is_trading_available: 0 | 1;
//   p_extra: {
//     volumes: {
//       start: number;
//       steps: number;
//       end: number;
//     };
//     replace: {
//       buy: number;
//       sell: number;
//     };
//   };
//   pgm_edited_on?: number;
// }
// export const ProductGroupUpdateValidator: JSONObjectKeyAndTypeValidator[] = [
//   {
//     key: 'p_is_trading_available',
//     required: false,
//     type: 'number',
//     regex: /^(0|1){1}$/,
//   },
//   {
//     key: 'p_is_active',
//     required: false,
//     type: 'number',
//     regex: /^(0|1){1}$/,
//   },
//   {
//     key: 'p_extra',
//     required: false,
//     type: 'object',
//     Extra: [
//       {
//         key: 'replace',
//         required: true,
//         type: 'object',
//         Extra: [
//           {
//             key: 'buy',
//             required: true,
//             type: 'number',
//           },
//           {
//             key: 'sell',
//             required: true,
//             type: 'number',
//           },
//         ],
//       },
//       {
//         key: 'volumes',
//         required: true,
//         type: 'object',
//         Extra: [
//           {
//             key: 'steps',
//             required: true,
//             type: 'number',
//           },
//           {
//             key: 'end',
//             required: true,
//             type: 'number',
//           },
//           {
//             key: 'start',
//             required: true,
//             type: 'number',
//           },
//         ],
//       },
//     ],
//   },
// ];
// export const ProductGroupMappingTable = {
//   table: 'ProductGroupsMap',
//   colums: {
//     pgm_id: 'pgm_id',
//     pgm_pid: 'pgm_pid',
//     pgm_gid: 'pgm_gid',
//     p_is_active: 'p_is_active',
//     p_is_trading_available: 'p_is_trading_available',
//     p_extra: 'p_extra',
//     pgm_edited_on: 'pgm_edited_on',
//   },
// };
