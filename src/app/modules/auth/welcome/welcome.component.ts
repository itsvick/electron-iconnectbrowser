import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@api/services/auth.service';
import { OfflineModeDialogComponent } from '@app/modules/_dialogs/offline-mode-dialog/offline-mode-dialog.component';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends AbstractBaseComponent implements OnInit {
  $disabled: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    private authService: AuthService) {
    super(http);
   }

  ngOnInit() {
    this.authService.checkOnlineState();
    this.authService.isOnline.subscribe(online => {
      this.$disabled.next(!online);
    });
    sessionStorage.removeItem('isOfflineMode');
  }

  loginRedirect(){
    sessionStorage.setItem('isOfflineMode', 'false');
    this.router.navigate(['/login']);
  }

  loginOffline() {
    const dialogRef = this.dialog.open(OfflineModeDialogComponent, {
      data: null,
      hasBackdrop: true,
      disableClose: true,
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(val => {
      if(val) {
        sessionStorage.setItem('isOfflineMode', 'true');
        this.router.navigate(['/resources']);
      }
    });
  }
}
