import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice } from 'src/app/domain/invoices/invoice.model';
import { InvoiceService } from 'src/app/domain/invoices/invoice.service';
import { WalletService } from 'src/app/domain/wallets/wallet.service';

@Component({
  selector: 'view-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css'],
})
export class ViewReceiveComponent implements OnInit {
  @Input() address$: Observable<string>;
  @Input() invoiceFormDisabled: boolean;
  @Input() showInvoiceQRCode: boolean;
  @Input() invoiceQRCodeString: string;

  @Output() appCreateInvoice: EventEmitter<Invoice>;
  @Output() appCancelInvoice: EventEmitter<never>;

  constructor(
    private walletService: WalletService,
    private invoiceService: InvoiceService
  ) {
    this.showInvoiceQRCode = false;
    this.invoiceQRCodeString = '';
    this.appCreateInvoice = new EventEmitter<Invoice>();
    this.appCancelInvoice = new EventEmitter<never>();
  }

  ngOnInit(): void {
    this.address$.subscribe();
  }

  showErrorDialog(errorMessage): void {
    console.error(errorMessage);
  }

  onCreateInvoice(
    toAddress: string,
    invoiceDisplayAmount: number,
    message: string
  ): void {
    if (!this.walletService.isValidAddress(toAddress)) {
      this.showErrorDialog('不正なアドレスです!');
    }
    if (invoiceDisplayAmount < 0) {
      this.showErrorDialog('請求額は正の数を入力してください!');
    }
    if (invoiceDisplayAmount > 8999999999) {
      this.showErrorDialog('請求額が大きすぎます!');
    }
    const invoice: Invoice = this.invoiceService.getInvoiceFromAddressAndDisplayQuantityAndMessage(
      toAddress,
      invoiceDisplayAmount,
      message
    );
    this.appCreateInvoice.emit(invoice);
  }

  onCancelInvoice(): void {
    if (!this.showInvoiceQRCode) {
      return;
    }
    this.appCancelInvoice.emit();
  }
}
