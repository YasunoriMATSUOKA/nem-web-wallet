import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
  nativeTokenDisplayQuantity$: Observable<number>;
  nativeTokenName$: Observable<string>;

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
    this.setAllState$();
  }

  ngOnInit(): void {
    this.setAllState$();
    if (!this.wallet$) {
      return;
    }
    this.wallet$.subscribe((wallet: Wallet): void => {
      this.isSignInComponentVisible = wallet.address ? false : true;
    });
  }

  ngDoChecked(): void {
    if (!this.wallet$) {
      return;
    }
    this.wallet$.subscribe((wallet: Wallet): void => {
      this.isSignInComponentVisible = wallet.address ? false : true;
    });
  }

  signIn(wallet: Wallet) {
    this.wallet = wallet;
    this.wallet$ = of(wallet);
    this.walletService.setWallet(wallet);
    this.walletService.setWallet$(wallet);
    this.isSignInComponentVisible = false;
    this.setAllState$();
  }

  signOut(): void {
    this.wallet = undefined;
    this.wallet$ = of(undefined);
    this.walletService.setWallet(undefined);
    this.walletService.setWallet$(undefined);
    this.isSignInComponentVisible = true;
    this.setAllState$();
  }

  setAllState$(): void {
    this.setAddress$();
    this.setNativeToken$();
    this.setNativeTokenDisplayQuantity$();
    this.setNativeTokenName$();
  }

  getWallet$(): Observable<Wallet | undefined> {
    return this.walletService.wallet$;
  }

  setWallet$(): void {
    this.wallet$ = this.getWallet$();
    this.wallet$.subscribe((wallet) => {});
  }

  getAddress$(): Observable<string> {
    return this.walletService.getAddress$();
  }

  setAddress$(): void {
    this.address$ = this.getAddress$();
    this.address$.subscribe((address) => {});
  }

  getNativeToken$(): Observable<Token> {
    return this.tokenService.getNativeToken$(this.walletService.wallet$);
  }

  setNativeToken$(): void {
    this.nativeToken$ = this.getNativeToken$();
    if (!this.nativeToken$) {
      return;
    }
    this.nativeToken$.subscribe((nativeToken) => {});
  }

  getNativeTokenDisplayQuantity$(): Observable<number> {
    if (!this.nativeToken$) {
      return of(0);
    }
    return this.nativeToken$.pipe(
      map((nativeToken) => {
        return nativeToken.displayQuantity;
      })
    );
  }

  setNativeTokenDisplayQuantity$(): void {
    this.nativeTokenDisplayQuantity$ = this.getNativeTokenDisplayQuantity$();
    if (!this.nativeTokenDisplayQuantity$) {
      return;
    }
    this.nativeTokenDisplayQuantity$.subscribe(
      (nativeTokenDisplayQuantity) => {}
    );
  }

  getNativeTokenName$(): Observable<string> {
    if (!this.nativeToken$) {
      return of('XEM');
    }
    return this.nativeToken$.pipe(
      map((nativeToken) => {
        return nativeToken.name;
      })
    );
  }

  setNativeTokenName$(): void {
    this.nativeTokenName$ = this.getNativeTokenName$();
    if (!this.nativeTokenName$) {
      return;
    }
    this.nativeTokenName$.subscribe((nativeTokenName) => {});
  }
}
