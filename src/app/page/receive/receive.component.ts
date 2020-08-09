import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Invoice } from 'src/app/domain/invoices/invoice.model';
import { InvoiceService } from 'src/app/domain/invoices/invoice.service';

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

  constructor(
    private walletService: WalletService,
    private invoiceService: InvoiceService
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
  }

  cancelInvoice(): void {
    this.showInvoiceQRCode = false;
    this.invoice = this.invoiceService.undefinedInvoice;
    this.invoiceQRCodeString = this.invoiceService.undefinedInvoiceQRCodeString;
    this.invoiceFormDisabled = false;
  }

  subscribeAllState$(): void {
    this.subscribeAddress$();
  }

  subscribeAddress$(): void {
    this.address$ = this.walletService.getAddress$();
    this.address$.subscribe();
  }
}
