import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Wallet } from './wallet.model';

import { Address, Account } from 'nem-library';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  wallet: Wallet | undefined;
  wallet$: Observable<Wallet | undefined>;

  constructor() {}

  setWallet(wallet: Wallet | undefined): void {
    this.wallet = wallet;
  }

  setWallet$(wallet: Wallet | undefined): void {
    this.wallet$ = of(wallet);
  }

  getAddress(): string {
    return this.wallet ? this.wallet.address : '';
  }

  getAddress$(): Observable<string> {
    return this.wallet$
      ? this.wallet$.pipe(
          map((wallet: Wallet | undefined) => {
            return wallet ? wallet.address : '';
          })
        )
      : of('');
  }

  isValidAddress(rawAddressString: string): boolean {
    let isValidAddress: boolean;
    try {
      const address = new Address(rawAddressString);
      isValidAddress = true;
    } catch (error) {
      console.error(error);
      isValidAddress = false;
    }
    return isValidAddress;
  }

  isValidPrivateKey(rawPrivateKeyString: string): boolean {
    let isValidPrivateKey: boolean;
    try {
      const account = Account.createWithPrivateKey(rawPrivateKeyString);
      isValidPrivateKey = true;
    } catch (error) {
      console.error(error);
      isValidPrivateKey = false;
    }
    return isValidPrivateKey;
  }

  isMatchedAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): boolean {
    let isMatchedAddressAndPrivateKey: boolean;
    if (
      this.isValidAddress(rawAddressString) &&
      this.isValidPrivateKey(rawPrivateKeyString)
    ) {
      const address = new Address(rawAddressString);
      const account = Account.createWithPrivateKey(rawPrivateKeyString);
      isMatchedAddressAndPrivateKey =
        address.plain() === account.address.plain();
    } else {
      isMatchedAddressAndPrivateKey = false;
    }
    return isMatchedAddressAndPrivateKey;
  }

  validatedWalletFromAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): Wallet | undefined {
    const validatedAccount = this.isMatchedAddressAndPrivateKey(
      rawAddressString,
      rawPrivateKeyString
    )
      ? Account.createWithPrivateKey(rawPrivateKeyString)
      : undefined;
    const validatedWallet = validatedAccount
      ? {
          privateKey: validatedAccount.privateKey,
          publicKey: validatedAccount.publicKey,
          address: validatedAccount.address.plain(),
        }
      : undefined;
    return validatedWallet;
  }
}
