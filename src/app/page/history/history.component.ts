import { Component, OnInit } from '@angular/core';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  isSignInComponentVisible: boolean;
  publicWallet: PublicWallet;

  constructor(private walletService: WalletService) {
    this.publicWallet = this.walletService.getPublicWallet();
    this.isSignInComponentVisible =
      this.publicWallet.address === '' ? true : false;
  }

  ngOnInit(): void {
    this.subscribeAllState$();
  }

  signIn(wallet: Wallet) {
    if (!this.walletService.isValidWallet(wallet)) {
      console.error('Invalid wallet!');
    }
    this.publicWallet = wallet;
    this.walletService.setWallet(wallet);
    this.isSignInComponentVisible = false;
    this.subscribeAllState$();
  }

  signOut(): void {
    this.publicWallet = this.walletService.undefinedPublicWallet;
    this.walletService.setWallet(this.walletService.undefinedWallet);
    this.isSignInComponentVisible = true;
    this.subscribeAllState$();
  }

  subscribeAllState$(): void {}
}
