import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Token } from 'src/app/domain/tokens/token.model';
import { TokenService } from 'src/app/domain/tokens/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isSignInComponentVisible: boolean;
  publicWallet: PublicWallet;
  nativeToken$: Observable<Token>;

  constructor(
    private walletService: WalletService,
    private tokenService: TokenService
  ) {
    this.publicWallet = this.walletService.getPublicWallet();
    this.isSignInComponentVisible = this.walletService.isValidPublicWallet(
      this.publicWallet
    )
      ? false
      : true;
  }

  ngOnInit(): void {
    this.subscribeNativeToken$();
  }

  signIn(wallet: Wallet) {
    if (!this.walletService.isValidWallet(wallet)) {
      console.error('Invalid wallet!');
      return;
    }
    this.publicWallet = this.walletService.convertWalletToPublicWallet(wallet);
    this.walletService.setWallet(wallet);
    this.isSignInComponentVisible = false;
    this.subscribeNativeToken$();
  }

  signOut(): void {
    this.publicWallet = this.walletService.undefinedPublicWallet;
    this.walletService.setWallet(this.walletService.undefinedWallet);
    this.isSignInComponentVisible = true;
    this.subscribeNativeToken$();
  }

  subscribeNativeToken$(): void {
    this.nativeToken$ = this.tokenService.getNativeToken$(
      this.walletService.getPublicWallet()
    );
    this.nativeToken$.subscribe();
  }
}
