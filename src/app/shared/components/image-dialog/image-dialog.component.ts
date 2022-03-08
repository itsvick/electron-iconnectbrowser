import { Component, OnInit, Inject } from '@angular/core';
import { ImageDialogData } from '@shared/models/image-dialog';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {

  isValidImage = true;

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ImageDialogData) {}

  noImage() {
    this.isValidImage = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
