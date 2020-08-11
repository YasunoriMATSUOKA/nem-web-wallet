import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { PublicWallet } from '../../domain/wallets/public-wallet.model';
import { Token } from '../../domain/tokens/token.model';

@Component({
  selector: 'view-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class ViewHomeComponent implements OnInit {
  @Input() publicWallet: PublicWallet;
  @Input() nativeToken$: Observable<Token>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.nativeToken$) {
      this.nativeToken$.subscribe();
    }
  }
}
