import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import {
  Address,
  UnconfirmedTransactionListener,
  TransactionTypes,
  TransferTransaction,
  BlockchainListener,
} from 'nem-library';
import { WebSocketConfig } from 'nem-library/dist/src/infrastructure/Listener';

import { TxServiceInterface } from './transaction.service';
import { webSocketNodes } from '../nodes/web-socket-nodes';
import { InvoiceQRCodeJSON } from '../invoices/invoice-qr-code-json.model';
import { Tx } from '../transactions/transaction.model';
import { Token } from '../tokens/token.model';

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

  constructor() {}

  convertTransactionTypeNumberToString(typeNumber: number): string {
    switch (typeNumber) {
      case TransactionTypes.TRANSFER:
        return 'TRANSFER';
      default:
        return 'UNSUPPORTED TYPE';
    }
  }

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
            direction:
              unconfirmedTransaction.signer.address.plain() ===
              recipientAddress.plain()
                ? 'both'
                : 'in',
            type: this.convertTransactionTypeNumberToString(
              unconfirmedTransaction.type
            ),
            isConfirmed: unconfirmedTransaction.isConfirmed(),
            isMultisig: false,
            fromAddress: unconfirmedTransaction.signer.address.plain(),
            toAddress: recipientAddress.plain(),
            nativeTokenQuantity: 0,
            otherTokens: undefined,
            totalFee: this.convertQuantityToNativeToken(
              unconfirmedTransaction.fee
            ),
            yourFee:
              unconfirmedTransaction.signer.address.plain() ===
              recipientAddress.plain()
                ? this.convertQuantityToNativeToken(unconfirmedTransaction.fee)
                : this.convertQuantityToNativeToken(0),
            blockHeight: undefined,
            id: '',
            hash: '',
          };
          return tx;
        })
      );
    return unconfirmedTx$;
  }
}
