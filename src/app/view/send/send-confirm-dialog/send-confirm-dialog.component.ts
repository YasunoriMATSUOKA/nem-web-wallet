import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'view-send-confirm-dialog',
  templateUrl: './send-confirm-dialog.component.html',
  styleUrls: ['./send-confirm-dialog.component.css'],
})
export class ViewSendConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public sendConfirmDialogRef: MatDialogRef<ViewSendConfirmDialogComponent>
  ) {}

  ngOnInit(): void {}

  onClickSendConfirm(): void {
    this.sendConfirmDialogRef.close('ok');
  }

  onClickSendCancel(): void {
    this.sendConfirmDialogRef.close('cancel');
  }
}
