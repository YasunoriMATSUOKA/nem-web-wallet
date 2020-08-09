import { Injectable } from '@angular/core';

import { Address, Account } from 'nem-library';

import { Wallet } from './wallet.model';
import { WalletServiceInterface } from './wallet.service';
import { undefinedWallet } from './undefined-wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletInfrastructureService implements WalletServiceInterface {
  constructor() {}

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
