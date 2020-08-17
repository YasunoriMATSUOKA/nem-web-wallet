import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TransferTransaction, NemAnnounceResult } from 'nem-library';

import { Tx } from './tx.model';
import { TxInfrastructureService } from './tx.infrastructure.service';
import { InvoiceQRCodeJSON } from '../invoices/invoice-qr-code-json.model';
import { WalletService } from '../wallets/wallet.service';

export interface TxServiceInterface {
  unconfirmedTxListener$(invoiceQRCodeJSON: InvoiceQRCodeJSON): Observable<Tx>;
  convertToUnsignedTxFromToAddressDisplayQuantityMessage(
    toAddress: string,
    displayQuantity: number,
    message: string
  ): TransferTransaction | undefined;
  sendTx$(tx: Tx): Observable<NemAnnounceResult>;
  getTxsHistory$(): Observable<Tx[]>;
}

@Injectable({
  providedIn: 'root',
})
export class TxService {
  constructor(
    private txInfrastructureService: TxInfrastructureService,
    private walletService: WalletService
  ) {}

  convertToUnsignedTxFromToAddressDisplayQuantityMessage(
    toAddress: string,
    displayQuantity: number,
    message: string
  ): TransferTransaction | undefined {
    return this.txInfrastructureService.convertToUnsignedTxFromToAddressDisplayQuantityMessage(
      toAddress,
      displayQuantity,
      message
    );
  }

  convertToSendTxFromToAddressDisplayQuantityMessage(
    toAddress,
    displayQuantity,
    message
  ): Tx | undefined {
    const isValidAddress = this.walletService.isValidAddress(toAddress);
    if (!isValidAddress) return undefined;
    const quantity = Math.round(displayQuantity * 1000000);
    if (quantity < 0 || quantity > 8999999999) return undefined;
    return {
      direction: undefined,
      type:
        message === ''
          ? 'TRANSFER_WITHOUT_MESSAGE'
          : 'TRANSFER_WITH_PLAIN_MESSAGE',
      fromAddress: undefined,
      toAddress: toAddress,
      nativeTokenQuantity: quantity,
      otherTokens: undefined,
      plainMessage: message,
      unsignedTxData: this.convertToUnsignedTxFromToAddressDisplayQuantityMessage(
        toAddress,
        displayQuantity,
        message
      ),
      signedTxData: undefined,
    };
  }

  unconfirmedTxListener$(invoiceQRCodeJSON: InvoiceQRCodeJSON): Observable<Tx> {
    return this.txInfrastructureService.unconfirmedTxListener$(
      invoiceQRCodeJSON
    );
  }

  signTx(unsignedTx: Tx): Tx | undefined {
    unsignedTx.signedTxData = this.walletService.signTransaction(
      unsignedTx.unsignedTxData
    );
    unsignedTx.toAddress = unsignedTx.unsignedTxData.recipient.plain();
    unsignedTx.fromAddress = unsignedTx.unsignedTxData.signer.address.plain();
    if (
      this.walletService.getPublicWallet().address === unsignedTx.toAddress &&
      this.walletService.getPublicWallet().address === unsignedTx.fromAddress
    ) {
      unsignedTx.direction = 'both';
    } else if (
      this.walletService.getPublicWallet().address === unsignedTx.toAddress
    ) {
      unsignedTx.direction = 'in';
    } else if (
      this.walletService.getPublicWallet().address === unsignedTx.fromAddress
    ) {
      unsignedTx.direction = 'out';
    } else {
      unsignedTx.direction = 'other';
      return undefined;
    }
    if (
      unsignedTx.plainMessage === '' ||
      unsignedTx.plainMessage === 'undefined'
    ) {
      unsignedTx.type = 'TRANSFER_WITHOUT_MESSAGE';
    } else {
      unsignedTx.type = 'TRANSFER_WITH_PLAIN_MESSAGE';
    }
    const signedTx = unsignedTx;
    return signedTx;
  }

  sendTx$(tx: Tx): Observable<NemAnnounceResult> {
    return this.txInfrastructureService.sendTx$(tx);
  }

  getTxsHistory$(): Observable<Tx[]> {
    return this.txInfrastructureService.getTxsHistory$();
  }
}
