import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Tx } from '../../domain/txs/tx.model';
import { TxService } from '../../domain/txs/tx.service';

@Component({
  selector: 'view-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class ViewSendComponent implements OnInit {
  @Input() sendFormDisabled: boolean;
  @Input() toAddress: string;
  @Input() displayQuantity: number;
  @Input() message: string;

  @Output() appClickSendButton: EventEmitter<Tx>;

  constructor(private txService: TxService) {
    this.appClickSendButton = new EventEmitter<Tx>();
  }

  ngOnInit(): void {}

  onClickSendButton(
    toAddress: string,
    displayQuantity: number,
    message: string
  ): void {
    const sendTx = this.txService.convertToSendTxFromToAddressDisplayQuantityMessage(
      toAddress,
      displayQuantity,
      message
    );
    if (sendTx === undefined) {
      console.error('不正なトランザクションです');
      return;
    }
    this.appClickSendButton.emit(sendTx);
  }
}
