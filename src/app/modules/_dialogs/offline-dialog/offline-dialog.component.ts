import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-dialog',
  templateUrl: './offline-dialog.component.html',
  styleUrls: ['./offline-dialog.component.scss']
})
export class OfflineDialogComponent {

  isValidImage = true;

  constructor(private router: Router, public dialogRef: MatDialogRef<OfflineDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  continue() {
    this.router.navigateByUrl('/resources');
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
