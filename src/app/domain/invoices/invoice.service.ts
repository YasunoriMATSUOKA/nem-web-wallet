import { Injectable } from '@angular/core';

import { Invoice } from './invoice.model';
import { InvoiceQRCodeJSON } from './invoice-qr-code-json.model';
import { undefinedInvoice } from './undefined-invoice';
import { undefinedInvoiceQRCodeJSON } from './undefined-invoice-qr-code-json.model';
import { WalletService } from '../wallets/wallet.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  undefinedInvoice: Invoice = undefinedInvoice;
  undefinedInvoiceQRCodeJSON: InvoiceQRCodeJSON = undefinedInvoiceQRCodeJSON;
  undefinedInvoiceQRCodeString: string = JSON.stringify(
    undefinedInvoiceQRCodeJSON
  );

  constructor(private walletService: WalletService) {}

  isValidInvoice(invoice: Invoice): boolean {
    if (
      this.walletService.isValidAddress(invoice.toAddress) &&
      invoice.nativeTokenQuantity >= 0 &&
      invoice.nativeTokenQuantity < 8999999999
    ) {
      return true;
    } else {
      return false;
    }
  }

  getInvoiceFromAddressAndDisplayQuantityAndMessage(
    toAddress: string,
    invoiceDisplayQuantity: number,
    message: string
  ) {
    if (
      !this.walletService.isValidAddress(toAddress) ||
      invoiceDisplayQuantity < 0 ||
      invoiceDisplayQuantity > 8999999999
    ) {
      return undefinedInvoice;
    }
    const invoice: Invoice = {
      toAddress: toAddress,
      nativeTokenQuantity: Math.round(invoiceDisplayQuantity * 1000000),
      tokens: undefined,
      isMessageEncrypted: false,
      message: message,
    };
    return invoice;
  }

  getInvoiceQRCodeJSON(invoice: Invoice): InvoiceQRCodeJSON {
    if (this.isValidInvoice(invoice)) {
      return {
        data: {
          addr: invoice.toAddress,
          amount: invoice.nativeTokenQuantity,
          msg: invoice.message,
          name: 'nem-web-wallet',
        },
        type: 2,
        v: 2,
      };
    } else {
      return undefinedInvoiceQRCodeJSON;
    }
  }

  getInvoiceQRCodeString(invoice: Invoice): string {
    if (this.isValidInvoice(invoice)) {
      return JSON.stringify(this.getInvoiceQRCodeJSON(invoice));
    } else {
      return JSON.stringify(undefinedInvoiceQRCodeJSON);
    }
  }
}
