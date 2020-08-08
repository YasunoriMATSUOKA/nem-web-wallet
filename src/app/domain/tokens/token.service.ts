import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from './token.model';
import { TokenInfrastructureService } from './token.infrastructure.service';
import { Wallet } from '../wallets/wallet.model';

export interface TokenServiceInterface {
  getNativeToken$(wallet$: Observable<Wallet | undefined>): Observable<Token>;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  nativeToken$: Observable<Token>;

  constructor(private tokenInfrastructureService: TokenInfrastructureService) {}

  getNativeToken$(wallet$: Observable<Wallet | undefined>): Observable<Token> {
    return this.tokenInfrastructureService.getNativeToken$(wallet$);
  }
}
