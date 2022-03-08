import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-mode-dialog',
  templateUrl: './offline-mode-dialog.component.html',
  styleUrls: ['./offline-mode-dialog.component.scss']
})
export class OfflineModeDialogComponent {

  isValidImage = true;

  constructor(public dialogRef: MatDialogRef<OfflineModeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  continue() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
