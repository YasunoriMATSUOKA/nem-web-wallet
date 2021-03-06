import { Injectable } from '@angular/core';

import { Account, TransferTransaction, SignedTransaction } from 'nem-library';

import { Wallet } from './wallet.model';
import { WalletInfrastructureService } from './wallet.infrastructure.service';
import { PublicWallet } from './public-wallet.model';
import { undefinedPublicWallet } from './undefined-public-wallet';
import { undefinedWallet } from './undefined-wallet';
import { Tx } from '../txs/tx.model';

export interface WalletServiceInterface {
  isValidAddress(rawAddressString: string): boolean;
  isValidPublicKey(rawPublicKeyString: string): boolean;
  isValidPrivateKey(rawPrivateKeyString: string): boolean;
  isMatchedAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): boolean;
  isMatchedAddressAndPublicKey(
    rawAddressString: string,
    rawPublicKeyString: string
  ): boolean;
  validatedWalletFromAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): Wallet;
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private wallet: Wallet;

  publicWallet: PublicWallet;
  undefinedWallet: Wallet = undefinedWallet;
  undefinedPublicWallet: PublicWallet = undefinedPublicWallet;

  constructor(
    private walletInfrastructureService: WalletInfrastructureService
  ) {}

  getPublicWallet(): PublicWallet {
    return this.publicWallet ? this.publicWallet : undefinedPublicWallet;
  }

  convertWalletToPublicWallet(wallet: Wallet): PublicWallet {
    const isValidWallet = this.isValidWallet(wallet);
    return isValidWallet
      ? {
          publicKey: wallet.publicKey,
          address: wallet.address,
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

  getAddress(): string {
    return this.wallet.address;
  }

  isValidAddress(rawAddressString: string): boolean {
    return this.walletInfrastructureService.isValidAddress(rawAddressString);
  }

  isValidPublicKey(rawPublicKeyString: string): boolean {
    return this.walletInfrastructureService.isValidPublicKey(
      rawPublicKeyString
    );
  }

  isValidPrivateKey(rawPrivateKeyString: string): boolean {
    return this.walletInfrastructureService.isValidPrivateKey(
      rawPrivateKeyString
    );
  }

  isMatchedAddressAndPrivateKey(
    rawAddressString: string,
    rawPrivateKeyString: string
  ): boolean {
    return this.walletInfrastructureService.isMatchedAddressAndPrivateKey(
      rawAddressString,
      rawPrivateKeyString
    );
  }

  isMatchedAddressAndPublicKey(
    rawAddressString: string,
    rawPublicKeyString: string
  ): boolean {
    return this.walletInfrastructureService.isMatchedAddressAndPublicKey(
      rawAddressString,
      rawPublicKeyString
    );
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
    return this.walletInfrastructureService.validatedWalletFromAddressAndPrivateKey(
      rawAddressString,
      rawPrivateKeyString
    );
  }

  signTransaction(unsignedTransaction: TransferTransaction): SignedTransaction {
    const account = Account.createWithPrivateKey(this.wallet.privateKey);
    const signedTransaction = account.signTransaction(unsignedTransaction);
    return signedTransaction;
  }
}
