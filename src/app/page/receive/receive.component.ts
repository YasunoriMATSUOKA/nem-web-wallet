import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Invoice } from 'src/app/domain/invoices/invoice.model';
import { InvoiceService } from 'src/app/domain/invoices/invoice.service';
import { Tx } from 'src/app/domain/transactions/transaction.model';
import { TxService } from 'src/app/domain/transactions/transaction.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css'],
})
export class ReceiveComponent implements OnInit {
  isSignInComponentVisible: boolean;
  publicWallet: PublicWallet;
  publicWallet$: Observable<PublicWallet>;
  invoiceFormDisabled: boolean;
  address$: Observable<string>;
  invoice: Invoice;
  showInvoiceQRCode: boolean;
  invoiceQRCodeString: string;
  unconfirmedTx$: Observable<Tx>;
  unconfirmedTxSubscription: Subscription;

  constructor(
    private walletService: WalletService,
    private invoiceService: InvoiceService,
    private txService: TxService
  ) {
    this.publicWallet = this.walletService.getPublicWallet();
    this.isSignInComponentVisible =
      this.publicWallet.address === '' ? true : false;
    this.invoiceFormDisabled = false;
    this.showInvoiceQRCode = false;
    this.invoiceQRCodeString = this.invoiceService.undefinedInvoiceQRCodeString;
  }

  ngOnInit(): void {
    this.subscribeAllState$();
  }

  ngOnDestroy(): void {
    this.unsucscribeAllState$();
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
    this.publicWallet = this.walletService.undefinedPublicWallet;
    this.publicWallet$ = of(this.walletService.undefinedPublicWallet);
    this.walletService.setWallet(this.walletService.undefinedWallet);
    this.walletService.setWallet$(this.walletService.undefinedWallet);
    this.isSignInComponentVisible = true;
    this.subscribeAllState$();
    this.cancelInvoice();
  }

  createInvoice(invoice: Invoice): void {
    this.invoice = invoice;
    this.invoiceFormDisabled = true;
    this.showInvoiceQRCode = true;
    this.invoiceQRCodeString = this.invoiceService.getInvoiceQRCodeString(
      invoice
    );
    this.subscribeUnconfirmedTx$();
  }

  cancelInvoice(): void {
    this.showInvoiceQRCode = false;
    this.invoice = this.invoiceService.undefinedInvoice;
    this.invoiceQRCodeString = this.invoiceService.undefinedInvoiceQRCodeString;
    this.invoiceFormDisabled = false;
    this.unconfirmedTxSubscription.unsubscribe();
  }

  subscribeAllState$(): void {
    this.subscribeAddress$();
  }

  unsucscribeAllState$(): void {
    if (!this.unconfirmedTxSubscription) return;
    this.unconfirmedTxSubscription.unsubscribe();
  }

  subscribeAddress$(): void {
    this.address$ = this.walletService.getAddress$();
    this.address$.subscribe();
  }

  subscribeUnconfirmedTx$(): void {
    console.log(this.invoiceQRCodeString);
    this.unconfirmedTxSubscription = this.txService
      .unconfirmedTxListener$(JSON.parse(this.invoiceQRCodeString))
      .subscribe(
        this.showUnconfirmedTx,
        (error) => {
          console.log('unconfirmedTransaction$ error!');
          console.error(error);
        },
        () => {
          console.log('unconfirmedTransaction$ completed');
        }
      );
  }

  showUnconfirmedTx(tx: Tx): void {
    console.log(tx);
  }
}
