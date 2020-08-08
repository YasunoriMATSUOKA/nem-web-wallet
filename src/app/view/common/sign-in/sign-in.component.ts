import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Wallet } from '../../../domain/wallets/wallet.model';
import { WalletService } from '../../../domain/wallets/wallet.service';

@Component({
  selector: 'view-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class ViewSignInComponent implements OnInit {
  @Input() isSignInComponentVisible: boolean;

  @Output() appSignIn: EventEmitter<Wallet>;

  constructor(private walletService: WalletService) {
    this.appSignIn = new EventEmitter();
  }

  ngOnInit(): void {}

  showErrorDialog(errorMessage): void {
    console.error(errorMessage);
  }

  onSignIn(rawAddressString, rawPrivateKeyString): void {
    if (!this.walletService.isValidAddress(rawAddressString)) {
      this.showErrorDialog('アドレスが不正な形式です!');
      return;
    }
    if (!this.walletService.isValidPrivateKey(rawPrivateKeyString)) {
      this.showErrorDialog('秘密鍵が不正な形式です!');
      return;
    }
    if (
      !this.walletService.isMatchedAddressAndPrivateKey(
        rawAddressString,
        rawPrivateKeyString
      )
    ) {
      this.showErrorDialog('アドレスと秘密鍵が一致しません!');
      return;
    }
    const wallet: Wallet = this.walletService.validatedWalletFromAddressAndPrivateKey(
      rawAddressString,
      rawPrivateKeyString
    );
    this.appSignIn.emit(wallet);
  }
}
