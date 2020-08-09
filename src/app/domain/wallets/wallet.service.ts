import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Address, Account } from 'nem-library';

import { Wallet } from './wallet.model';
import { PublicWallet } from './public-wallet.model';
import { undefinedWallet } from './undefined-wallet';
import { undefinedPublicWallet } from './undefined-public-wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private wallet: Wallet;
  private wallet$: Observable<Wallet>;

  publicWallet: PublicWallet;
  publicWallet$: Observable<PublicWallet>;

  constructor() {}

  getPublicWallet(): PublicWallet {
    return this.publicWallet ? this.publicWallet : undefinedPublicWallet;
  }

  getPublicWallet$(): Observable<PublicWallet> {
    return this.publicWallet$ ? this.publicWallet$ : of(undefinedPublicWallet);
  }

  convertWalletToPublicWallet(wallet: Wallet): PublicWallet {
    const isValidWallet = this.isValidWallet(wallet);
    const account = isValidWallet
      ? Account.createWithPrivateKey(wallet.address)
      : undefined;
    return isValidWallet
      ? {
          publicKey: account.publicKey,
          address: account.address.plain(),
        }
      : undefinedPublicWallet;
  }

  setWallet(wallet: Wallet): void {
    this.wallet = wallet;
    this.publicWallet = {
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }

  setWallet$(wallet: Wallet): void {
    this.wallet$ = of(wallet);
    this.publicWallet$ = of({
      publicKey: wallet.publicKey,
      address: wallet.address,
    });
  }

  getAddress(): string {
    return this.wallet.address;
  }

  getAddress$(): Observable<string> {
    return this.wallet$
      ? this.wallet$.pipe(
          map((wallet) => {
            return wallet.address;
          })
        )
      : of('');
  }

  isValidAddress(rawAddressString: string): boolean {
    try {
      const address = new Address(rawAddressString);
      return true;
    } catch (error) {
      return false;
    }
  }

  isValidPublicKey(rawPublicKeyString: string): boolean {
    try {
      const account = Account.createWithPublicKey(rawPublicKeyString);
      return true;
    } catch (error) {
      return false;
    }
  }

  isValidPrivateKey(rawPrivateKeyString: string): boolean {
    try {
      const account = Account.createWithPrivateKey(rawPrivateKeyString);
      return true;
    } catch (error) {
      return false;
    }
  }

  isMatchedAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): boolean {
    if (
      this.isValidAddress(rawAddressString) &&
      this.isValidPrivateKey(rawPrivateKeyString)
    ) {
      const address = new Address(rawAddressString);
      const account = Account.createWithPrivateKey(rawPrivateKeyString);
      return address.plain() === account.address.plain();
    } else {
      return false;
    }
  }

  isMatchedAddressAndPublicKey(
    rawAddressString: string,
    rawPublicKeyString: string
  ): boolean {
    if (
      this.isValidAddress(rawAddressString) &&
      this.isValidPublicKey(rawPublicKeyString)
    ) {
      const address = new Address(rawAddressString);
      const publicAccount = Account.createWithPublicKey(rawPublicKeyString);
      return address.plain() === publicAccount.address.plain();
    } else {
      return false;
    }
  }

  isValidWallet(wallet: Wallet): boolean {
    if (wallet.privateKey && wallet.publicKey && wallet.address) {
      const isValidWallet =
        this.isValidPrivateKey(wallet.privateKey) &&
        this.isValidPublicKey(wallet.publicKey) &&
        this.isValidAddress(wallet.address) &&
        this.isMatchedAddressAndPrivateKey(wallet.address, wallet.privateKey) &&
        this.isMatchedAddressAndPublicKey(wallet.address, wallet.publicKey);
      return isValidWallet;
    } else {
      return false;
    }
  }

  isValidPublicWallet(publicWallet: PublicWallet): boolean {
    if (publicWallet.publicKey && publicWallet.address) {
      const isValidPublicWallet =
        this.isValidPublicKey(publicWallet.publicKey) &&
        this.isValidAddress(publicWallet.address) &&
        this.isMatchedAddressAndPublicKey(
          publicWallet.address,
          publicWallet.publicKey
        );
      return isValidPublicWallet;
    } else {
      return false;
    }
  }

  validatedWalletFromAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): Wallet {
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
      : undefinedWallet;
    return validatedWallet;
  }
}
