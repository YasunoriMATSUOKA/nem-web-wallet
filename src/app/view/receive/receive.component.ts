import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice } from 'src/app/domain/invoices/invoice.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { Wallet } from 'nem-library';

@Component({
  selector: 'view-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css'],
})
export class ViewReceiveComponent implements OnInit {
  @Input() address$: Observable<string>;

  @Output() appCreateInvoice: EventEmitter<Invoice>;

  constructor(private walletService: WalletService) {
    this.appCreateInvoice = new EventEmitter<Invoice>();
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
    const invoice: Invoice = {
      toAddress: toAddress,
      nativeTokenQuantity: Math.round(invoiceDisplayAmount * 1000000),
      tokens: undefined,
      isMessageEncrypted: false,
      message: message,
    };
    this.appCreateInvoice.emit(invoice);
  }
}
