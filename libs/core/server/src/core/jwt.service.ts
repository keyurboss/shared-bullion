import { Injectable, Optional, Inject } from '@nestjs/common';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { isNotNullish } from '@rps/bullion-interfaces';

export const JWT_KEY = 'JWT_KEY';

@Injectable()
export class JwtService {
  private _key = '';
  
  constructor(@Optional() @Inject(JWT_KEY) k: string) {
    if (isNotNullish(k)) {
      this._key = k;
    }
  }

  VerifyToken<T = unknown>(token: string) {
    return verify(token, this._key, {}) as T;
  }

  SignData<T>(data: T, options?: SignOptions) {
    return sign(JSON.stringify(data), this._key, options);
  }
}
