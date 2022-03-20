import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  widgets = [];

  constructor(public dialogRef: MatDialogRef<ProfileSettingsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.fetchWidgetData();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  fetchWidgetData() {
  }

  changeProfilePic() {
    console.log('TODO: write logic for changing profile picture!');
  }

  saveProfile() {
    console.log('TODO: wire up saving of profile!');
    this.dialogRef.close();
  }

}
