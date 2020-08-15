import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Tx } from 'src/app/domain/txs/tx.model';
import { TxService } from 'src/app/domain/txs/tx.service';

import { ViewSendConfirmDialogComponent } from '../../view/send/send-confirm-dialog/send-confirm-dialog.component';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  private sendTxSuccessNoticeSound: HTMLAudioElement = new Audio(
    '../../../assets/money-drop1.mp3'
  );

  isSignInComponentVisible: boolean;
  publicWallet: PublicWallet;
  sendFormDisabled: boolean;
  sendTxResultHash: string;
  toAddress: string | undefined;
  displayQuantity: number | undefined;
  message: string | undefined;

  constructor(
    private walletService: WalletService,
    private txService: TxService,
    private snackBar: MatSnackBar,
    public matDialog: MatDialog
  ) {
    this.publicWallet = this.walletService.getPublicWallet();
    this.isSignInComponentVisible =
      this.publicWallet.address === '' ? true : false;
    this.sendFormDisabled = this.publicWallet.address === '' ? true : false;
    this.toAddress = '';
    this.displayQuantity = 0;
    this.message = '';
  }

  ngOnInit(): void {
    this.sendTxSuccessNoticeSound.load();
  }

  signIn(wallet: Wallet) {
    if (!this.walletService.isValidWallet(wallet)) {
      console.error('Invalid wallet!');
    }
    this.publicWallet = wallet;
    this.walletService.setWallet(wallet);
    this.isSignInComponentVisible = false;
    this.sendFormDisabled = false;
  }

  signOut(): void {
    this.publicWallet = this.walletService.undefinedPublicWallet;
    this.walletService.setWallet(this.walletService.undefinedWallet);
    this.isSignInComponentVisible = true;
    this.clearSendForm();
    this.sendFormDisabled = true;
  }

  clickSendButton(tx: Tx): void {
    console.log('unsignedTx', tx);
    const signedTx = this.txService.signTx(tx);
    console.log('signedTx', signedTx);
    const sendConfirmDialog = this.matDialog.open(
      ViewSendConfirmDialogComponent,
      {
        data: {
          fromAddress: signedTx.fromAddress,
          toAddress: signedTx.toAddress,
          displayQuantity: signedTx.nativeTokenQuantity / 1000000,
          message: signedTx.plainMessage,
        },
      }
    );
    sendConfirmDialog.afterClosed().subscribe((result: string) => {
      if (result === 'ok') {
        this.sendTx(signedTx);
      } else if (result === 'cancel') {
        this.showSnackBarSendTxCancel();
      }
    });
  }

  sendTx(tx: Tx): void {
    this.txService.sendTx$(tx).subscribe(
      (nemAcounceResult) => {
        console.log(nemAcounceResult);
        if (nemAcounceResult.message === 'SUCCESS') {
          this.sendTxSuccessNoticeSound.play();
          this.showSnackBarSendTxSuccess();
          this.clearSendForm();
        } else {
          this.showSnackBarSendTxError();
        }
      },
      (error) => {
        console.error(error);
        this.showSnackBarSendTxError();
      },
      () => {
        console.log('completed');
      }
    );
  }

  showSnackBarSendTxSuccess(): void {
    this.snackBar.open('トランザクション送信成功', '閉じる', {
      duration: 5000,
    });
  }

  showSnackBarSendTxError(): void {
    this.snackBar.open('トランザクション送信失敗', '閉じる', {
      duration: 5000,
    });
  }

  showSnackBarSendTxCancel(): void {
    this.snackBar.open('トランザクション送信キャンセル', '閉じる', {
      duration: 2000,
    });
  }

  soundNoticeSendTxSuccess(): void {
    this.sendTxSuccessNoticeSound.play();
  }

  clearSendForm(): void {
    this.toAddress = '';
    this.displayQuantity = 0;
    this.message = '';
  }
}
