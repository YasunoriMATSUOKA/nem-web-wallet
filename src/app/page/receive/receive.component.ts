import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css'],
})
export class ReceiveComponent implements OnInit {
  private wallet$: Observable<Wallet | undefined>;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.wallet$ = this.walletService.wallet$;
  }
}
