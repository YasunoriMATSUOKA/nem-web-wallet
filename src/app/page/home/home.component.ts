import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Token } from 'src/app/domain/tokens/token.model';
import { TokenService } from 'src/app/domain/tokens/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'nem-web-wallet';
  isSignInComponentVisible: boolean;
  wallet: Wallet | undefined;
  wallet$: Observable<Wallet | undefined>;
  address$: Observable<string>;
  nativeToken$: Observable<Token>;

  constructor(
    private walletService: WalletService,
    private tokenService: TokenService
  ) {
    this.wallet = this.walletService.wallet;
    if (this.wallet) {
      this.isSignInComponentVisible = this.wallet.address ? false : true;
    } else {
      this.isSignInComponentVisible = true;
    }
    this.subscribeAllState$();
  }

  ngOnInit(): void {
    this.subscribeAllState$();
    if (!this.wallet$) return;
    this.wallet$.subscribe();
  }

  ngDoChecked(): void {
    if (!this.wallet$) return;
    this.wallet$.subscribe();
  }

  signIn(wallet: Wallet) {
    this.wallet = wallet;
    this.wallet$ = of(wallet);
    this.walletService.setWallet(wallet);
    this.walletService.setWallet$(wallet);
    this.isSignInComponentVisible = false;
    this.subscribeAllState$();
  }

  signOut(): void {
    this.wallet = undefined;
    this.wallet$ = of(undefined);
    this.walletService.setWallet(undefined);
    this.walletService.setWallet$(undefined);
    this.isSignInComponentVisible = true;
    this.subscribeAllState$();
  }

  subscribeAllState$(): void {
    this.subscribeAddress$();
    this.subscribeNativeToken$();
  }

  setWallet(): void {
    this.wallet = this.walletService.wallet;
  }

  subscribeWallet$(): void {
    this.wallet$ = this.walletService.wallet$;
    if (!this.wallet$) return;
    this.wallet$.subscribe();
  }

  subscribeAddress$(): void {
    this.address$ = this.walletService.getAddress$();
    this.address$.subscribe();
  }

  subscribeNativeToken$(): void {
    this.nativeToken$ = this.tokenService.getNativeToken$(
      this.walletService.wallet$
    );
    if (!this.nativeToken$) return;
    this.nativeToken$.subscribe();
  }
}
