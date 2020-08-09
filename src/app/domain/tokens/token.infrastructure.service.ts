import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { ServerConfig, Address, AccountHttp } from 'nem-library';

import { Token } from './token.model';
import { TokenServiceInterface } from './token.service';
import { PublicWallet } from '../wallets/public-wallet.model';
import { restNodes } from '../nodes/rest-nodes';

@Injectable({
  providedIn: 'root',
})
export class TokenInfrastructureService implements TokenServiceInterface {
  constructor() {}

  serverConfigs: ServerConfig[] = restNodes.map((node) => {
    return {
      protocol: node.protocol,
      domain: node.domain,
      port: node.port,
    };
  });

  getNativeToken$(publicWallet$: Observable<PublicWallet>): Observable<Token> {
    const accountHttp = new AccountHttp(this.serverConfigs);
    const address$ = publicWallet$
      ? publicWallet$.pipe(
          map((publicWallet: PublicWallet) => {
            return publicWallet.address;
          })
        )
      : of('');
    const nativeToken$ = address$
      .pipe(
        map((address: string) => {
          const addressObject: Address | undefined =
            address !== '' ? new Address(address) : undefined;
          return addressObject;
        })
      )
      .pipe(
        mergeMap((addressObject) => {
          if (!addressObject) {
            const noToken: Token = {
              name: 'XEM',
              quantity: 0,
              divisibility: 6,
              displayQuantity: 0,
              description: '',
            };
            return of(noToken);
          }
          return accountHttp.getFromAddress(addressObject).pipe(
            map((accountInfoWithMetaData) => {
              const token: Token = {
                name: 'XEM',
                quantity: accountInfoWithMetaData.balance.balance,
                divisibility: 6,
                displayQuantity:
                  accountInfoWithMetaData.balance.balance / 1000000,
                description: '',
              };
              return token;
            })
          );
        })
      );
    return nativeToken$;
  }
}
