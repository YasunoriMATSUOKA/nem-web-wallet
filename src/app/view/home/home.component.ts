import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'view-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class ViewHomeComponent implements OnInit {
  @Input() address$: Observable<string>;
  @Input() nativeTokenDisplayQuantity$: Observable<number>;
  @Input() nativeTokenName$: Observable<string>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.address$.subscribe();
    if (this.nativeTokenDisplayQuantity$) {
      this.nativeTokenDisplayQuantity$.subscribe();
    }
    if (this.nativeTokenName$) {
      this.nativeTokenName$.subscribe();
    }
  }
}
