import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  AccountHttp,
  Transaction,
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

  getTxsHistory$(): Observable<Tx[]> {
    return this.getAllTransactions$().pipe(
      map((transactions: Transaction[]): Tx[] => {
        return transactions.map(
          (transaction): Tx => {
            if (transaction instanceof TransferTransaction) {
              return this.parseFromTransferTransactionToTx(transaction);
            } else {
              return {
                direction: undefined,
                type: undefined,
                fromAddress: undefined,
                toAddress: undefined,
                nativeTokenQuantity: 0,
                otherTokens: undefined,
                plainMessage: undefined,
                unsignedTxData: undefined,
                signedTxData: undefined,
              };
            }
          }
        );
      })
    );
  }

  parseFromTransferTransactionToTx(
    transferTransaction: TransferTransaction
  ): Tx | undefined {
    if (transferTransaction.type === TransactionTypes.TRANSFER) {
      const fromAddress = transferTransaction.signer.address.plain();
      const toAddress = transferTransaction.recipient.plain();
      let direction;
      if (
        fromAddress === toAddress &&
        fromAddress === this.walletService.getAddress()
      ) {
        direction = 'both';
      } else if (fromAddress === this.walletService.getAddress()) {
        direction = 'out';
      } else if (toAddress === this.walletService.getAddress()) {
        direction = 'in';
      }
      let type, plainMessage;
      if (
        transferTransaction.message.isPlain() &&
        transferTransaction.message.payload === ''
      ) {
        type = 'TRANSFER_WITHOUT_MESSAGE';
        plainMessage = '';
      } else if (
        transferTransaction.message.isPlain() &&
        transferTransaction.message.payload !== '' &&
        transferTransaction.message.isEncrypted()
      ) {
        type = 'TRANSFER_WITH_PLAIN_MESSAGE';
        plainMessage = transferTransaction.message.payload;
      } else {
        type = undefined;
        plainMessage = undefined;
      }
      const tx: Tx = {
        direction: direction,
        type: type,
        fromAddress: fromAddress,
        toAddress: toAddress,
        nativeTokenQuantity: transferTransaction.xem().quantity,
        otherTokens: undefined,
        plainMessage: plainMessage,
        unsignedTxData: transferTransaction,
        signedTxData: undefined,
      };
      return tx;
    } else {
      return {
        direction: undefined,
        type: undefined,
        fromAddress: undefined,
        toAddress: undefined,
        nativeTokenQuantity: 0,
        otherTokens: undefined,
        plainMessage: undefined,
        unsignedTxData: undefined,
        signedTxData: undefined,
      };
    }
  }

  getAllTransactions$(): Observable<Transaction[]> {
    if (
      !this.walletService.isValidPublicWallet(
        this.walletService.getPublicWallet()
      )
    )
      return of([]);
    const address = new Address(this.walletService.getAddress());
    const accountHttp = new AccountHttp(this.serverConfigs);
    const allTransactions$ = accountHttp.allTransactions(address);
    return allTransactions$;
  }
}
