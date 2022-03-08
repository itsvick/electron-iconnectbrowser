import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      message: string,
      positiveText: string,
      negativeText: string,
      showPositive: boolean,
      showNegative: boolean,
      buttonWidth: string,
      buttonPosition: string
    }) {
    if (!data.title) { data.title = 'Confirm'; }
    if (!data.positiveText) { data.positiveText = 'Confirm'; }
    if (!data.negativeText) { data.negativeText = 'Cancel'; }
    if (!data.buttonPosition) {data.buttonPosition = 'unset'; }
    if (data.showPositive === null || data.showPositive === undefined) { data.showPositive = true; }
    if (data.showNegative === null || data.showNegative === undefined) { data.showNegative = true; }
  }

  confirm(value: boolean): void {
    this.dialogRef.close(value);
  }

}
