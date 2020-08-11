import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tx } from './tx.model';
import { TxInfrastructureService } from './tx.infrastructure.service';
import { InvoiceQRCodeJSON } from '../invoices/invoice-qr-code-json.model';

export interface TxServiceInterface {
  unconfirmedTxListener$(invoiceQRCodeJSON: InvoiceQRCodeJSON): Observable<Tx>;
}

@Injectable({
  providedIn: 'root',
})
export class TxService {
  constructor(private txInfrastructureService: TxInfrastructureService) {}

  unconfirmedTxListener$(invoiceQRCodeJSON: InvoiceQRCodeJSON): Observable<Tx> {
    return this.txInfrastructureService.unconfirmedTxListener$(
      invoiceQRCodeJSON
    );
  }
}
