import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Wallet } from 'src/app/domain/wallets/wallet.model';
import { WalletService } from 'src/app/domain/wallets/wallet.service';
import { PublicWallet } from 'src/app/domain/wallets/public-wallet.model';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css'],
})
export class ReceiveComponent implements OnInit {
  publicWallet$: Observable<PublicWallet>;

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.publicWallet$ = this.walletService.getPublicWallet$();
  }
}
