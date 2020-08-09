import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { undefinedPublicWallet } from 'src/app/domain/wallets/undefined-public-wallet';
import { undefinedWallet } from 'src/app/domain/wallets/undefined-wallet';
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
  publicWallet$: Observable<PublicWallet>;
  address$: Observable<string>;
  nativeToken$: Observable<Token>;

  constructor(
    private walletService: WalletService,
    private tokenService: TokenService
  ) {
    this.publicWallet = this.walletService.getPublicWallet();
    this.isSignInComponentVisible =
      this.publicWallet.address === '' ? true : false;
    this.subscribeAllState$();
  }

  ngOnInit(): void {
    this.subscribeAllState$();
  }

  signIn(wallet: Wallet) {
    if (!this.walletService.isValidWallet(wallet)) {
      console.error('Invalid wallet!');
    }
    this.publicWallet = wallet;
    this.publicWallet$ = of(wallet);
    this.walletService.setWallet(wallet);
    this.walletService.setWallet$(wallet);
    this.isSignInComponentVisible = false;
    this.subscribeAllState$();
  }

  signOut(): void {
    this.publicWallet = undefinedPublicWallet;
    this.publicWallet$ = of(undefinedPublicWallet);
    this.walletService.setWallet(undefinedWallet);
    this.walletService.setWallet$(undefinedWallet);
    this.isSignInComponentVisible = true;
    this.subscribeAllState$();
  }

  subscribeAllState$(): void {
    this.subscribeAddress$();
    this.subscribeNativeToken$();
  }

  subscribeAddress$(): void {
    this.address$ = this.walletService.getAddress$();
    this.address$.subscribe();
  }

  subscribeNativeToken$(): void {
    this.nativeToken$ = this.tokenService.getNativeToken$(
      this.walletService.getPublicWallet$()
    );
    if (!this.nativeToken$) return;
    this.nativeToken$.subscribe();
  }
}
