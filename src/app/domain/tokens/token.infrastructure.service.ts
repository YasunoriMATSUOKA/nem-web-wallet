import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ServerConfig, Address, AccountHttp } from 'nem-library';

import { Token } from './token.model';
import { TokenServiceInterface } from './token.service';
import { PublicWallet } from '../wallets/public-wallet.model';
import { WalletService } from '../wallets/wallet.service';
import { restNodes } from '../nodes/rest-nodes';

@Injectable({
  providedIn: 'root',
})
export class TokenInfrastructureService implements TokenServiceInterface {
  constructor(private walletService: WalletService) {}

  serverConfigs: ServerConfig[] = restNodes.map((node) => {
    return {
      protocol: node.protocol,
      domain: node.domain,
      port: node.port,
    };
  });

  getNativeToken$(publicWallet: PublicWallet): Observable<Token> {
    const accountHttp = new AccountHttp(this.serverConfigs);
    if (!this.walletService.isValidPublicWallet(publicWallet)) {
      const noToken: Token = {
        name: 'XEM',
        quantity: 0,
        divisibility: 6,
        displayQuantity: 0,
        description: '',
      };
      return of(noToken);
    }
    const address = new Address(publicWallet.address);
    const nativeToken$ = accountHttp.getFromAddress(address).pipe(
      map((accountInfoWithMetaData) => {
        const token: Token = {
          name: 'XEM',
          quantity: accountInfoWithMetaData.balance.balance,
          divisibility: 6,
          displayQuantity: accountInfoWithMetaData.balance.balance / 1000000,
          description: '',
        };
        return token;
      })
    );
    return nativeToken$;
  }
}
