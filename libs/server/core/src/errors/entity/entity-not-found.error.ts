import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

type EntityNotFoundErrorWithMessageOptions = {
  message: string;
};

type EntityNotFoundErrorWithNameAndIdOptions = {
  name: string;
  id: string;
};

export class EntityNotFoundError extends RESTApiReqError {
  constructor(options: EntityNotFoundErrorWithMessageOptions);
  constructor(options: EntityNotFoundErrorWithNameAndIdOptions);
  constructor(
    options:
      | EntityNotFoundErrorWithMessageOptions
      | EntityNotFoundErrorWithNameAndIdOptions,
  ) {
    let message: string;

    if ('message' in options) {
      message = options.message;
    } else {
      message = `${options.name} identified by ${options.id} not found`;
    }

    super(ErrorCode.ENTITY_NOT_FOUND, message);
  }
}
