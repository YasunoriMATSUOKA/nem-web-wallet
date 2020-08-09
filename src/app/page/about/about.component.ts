import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/domain/wallets/wallet.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private walletService: WalletService) {}

  ngOnInit(): void {}

  signOut(): void {
    this.walletService.setWallet(this.walletService.undefinedWallet);
    this.walletService.setWallet$(this.walletService.undefinedWallet);
  }
}
