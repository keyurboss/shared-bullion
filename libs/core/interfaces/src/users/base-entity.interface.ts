export interface IBaseEntity<T = string> {
  id: T;
  createdAt: Date;
  modifiedAt: Date;
}
