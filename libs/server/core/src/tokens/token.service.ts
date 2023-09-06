import { Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { Observable } from 'rxjs';
import { SignOptions, sign, verify, Secret, VerifyOptions } from 'jsonwebtoken';

export const TOKEN_KEY_PROVIDER = Symbol('TOKEN_KEY_PROVIDER');

@Injectable()
export class TokenService {
  private key: Secret = randomBytes(128).toString('hex');
  constructor(
    @Inject(TOKEN_KEY_PROVIDER) keyProvider: string | Observable<Secret>,
  ) {
    if (typeof keyProvider === 'string') {
      this.key = keyProvider;
    } else if (typeof keyProvider === 'object') {
      keyProvider.subscribe((k) => {
        this.key = k;
      });
    }
  }

  signData(payload: string | Buffer | object, options?: SignOptions) {
    return sign(payload, this.key, options);
  }

  verifyData(token: string, options?: VerifyOptions): string {
    return verify(token, this.key, options).toString();
  }

  verifyJson<T extends never>(token: string, options?: VerifyOptions): T {
    try {
      return JSON.parse(this.verifyData(token, options)) as T;
    } catch (error) {
      throw new Error('Invalid JSON payload');
    }
  }
}
