import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import {
  Address,
  UnconfirmedTransactionListener,
  TransactionTypes,
  TransferTransaction,
  ServerConfig,
  TransactionHttp,
  TimeWindow,
  XEM,
  EmptyMessage,
  PlainMessage,
  NemAnnounceResult,
} from 'nem-library';
import { WebSocketConfig } from 'nem-library/dist/src/infrastructure/Listener';

import { TxServiceInterface } from './tx.service';
import { webSocketNodes } from '../nodes/web-socket-nodes';
import { restNodes } from '../nodes/rest-nodes';
import { InvoiceQRCodeJSON } from '../invoices/invoice-qr-code-json.model';
import { Tx } from './tx.model';
import { Token } from '../tokens/token.model';
import { WalletService } from '../wallets/wallet.service';

new TransferTransaction();

@Injectable({
  providedIn: 'root',
})
export class TxInfrastructureService implements TxServiceInterface {
  webSocketConfigs: WebSocketConfig[] = webSocketNodes.map((node) => {
    return {
      protocol: node.protocol,
      domain: node.domain,
      port: node.port,
    };
  });
  serverConfigs: ServerConfig[] = restNodes.map((node) => {
    return {
      protocol: node.protocol,
      domain: node.domain,
      port: node.port,
    };
  });

  constructor(private walletService: WalletService) {}

  convertQuantityToNativeToken(quantity: number): Token {
    return {
      name: 'XEM',
      quantity: quantity,
      divisibility: 6,
      displayQuantity: Math.round(quantity / 1000000),
      description: '',
    };
  }

  unconfirmedTxListener$(invoiceQRCodeJSON: InvoiceQRCodeJSON): Observable<Tx> {
    const recipientAddress = new Address(invoiceQRCodeJSON.data.addr);

    const unconfirmedTx$ = new UnconfirmedTransactionListener(
      this.webSocketConfigs
    )
      .given(recipientAddress)
      .pipe(
        filter(
          (unconfirmedTransaction) =>
            unconfirmedTransaction.type === TransactionTypes.TRANSFER
        )
      )
      .pipe(
        map((unconfirmedTransaction) => {
          const tx: Tx = {
            direction: 'in',
            type: 'TRANSFER_WITHOUT_MESSAGE',
            fromAddress: unconfirmedTransaction.signer.address.plain(),
            toAddress: recipientAddress.plain(),
            nativeTokenQuantity: 0,
            otherTokens: undefined,
            plainMessage: '',
            unsignedTxData: undefined,
            signedTxData: undefined,
          };
          return tx;
        })
      );
    return unconfirmedTx$;
  }

  convertToUnsignedTxFromToAddressDisplayQuantityMessage(
    toAddress: string,
    displayQuantity: number,
    message: string
  ): TransferTransaction | undefined {
    if (!this.walletService.isValidAddress(toAddress)) return undefined;
    if (displayQuantity < 0 || displayQuantity > 8999999999) return undefined;
    const unsignedTransaction = TransferTransaction.create(
      TimeWindow.createWithDeadline(),
      new Address(toAddress),
      new XEM(displayQuantity),
      message ? PlainMessage.create(message) : EmptyMessage
    );
    return unsignedTransaction;
  }

  sendTx$(tx: Tx): Observable<NemAnnounceResult> {
    const signedTransaction = tx.signedTxData;
    const transactionHttp = new TransactionHttp(this.serverConfigs);
    const sendTxResult$ = transactionHttp.announceTransaction(
      signedTransaction
    );
    return sendTxResult$;
  }
}
