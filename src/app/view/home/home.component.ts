import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '../../domain/tokens/token.model';

@Component({
  selector: 'view-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class ViewHomeComponent implements OnInit {
  @Input() address$: Observable<string>;
  @Input() nativeToken$: Observable<Token>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.address$.subscribe();
    if (this.nativeToken$) {
      this.nativeToken$.subscribe();
    }
  }
}
