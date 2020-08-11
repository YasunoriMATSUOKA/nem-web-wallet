import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from './token.model';
import { TokenInfrastructureService } from './token.infrastructure.service';
import { PublicWallet } from '../wallets/public-wallet.model';

export interface TokenServiceInterface {
  getNativeToken$(publicWallet: PublicWallet): Observable<Token>;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  nativeToken$: Observable<Token>;

  constructor(private tokenInfrastructureService: TokenInfrastructureService) {}

  getNativeToken$(publicWallet: PublicWallet): Observable<Token> {
    return this.tokenInfrastructureService.getNativeToken$(publicWallet);
  }
}
