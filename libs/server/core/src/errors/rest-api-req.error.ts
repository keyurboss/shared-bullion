import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@rps/bullion-interfaces';

export class RESTApiReqError extends HttpException {
  constructor(
    errorCode: ErrorCode,
    message: string,
    statusCode = HttpStatus.BAD_REQUEST,
  ) {
    const error = {
      code: errorCode,
      message,
      name: RESTApiReqError.name,
    };
    super(error, statusCode);
    error.name = this.constructor.name;
  }
}
