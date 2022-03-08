import { Component, OnInit } from '@angular/core';
// import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Router, NavigationEnd } from '@angular/router';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { OfflineDialogComponent } from './modules/_dialogs/offline-dialog/offline-dialog.component';
import { AuthService } from '@api/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends AbstractBaseComponent implements OnInit {
  title = 'clientweb';
  shouldPopupWhenOffline: boolean;
  online: boolean = true;

  constructor(
    private router: Router,
    // private gtmService: GoogleTagManagerService
    public http: HttpClient,
    public dialog: MatDialog,
    private authService: AuthService) {
    super(http);
  }

  ngOnInit() {
    // https://itnext.io/how-to-add-google-tag-manager-to-an-angular-application-fc68624386e2
    // push GTM data layer for every visited page
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url,
        };

        // this.gtmService.pushTag(gtmTag);

        if (item.url.includes('/subjects') || item.url.includes('/papers') || item.url.includes('/videos') || item.url.includes('/lessons')) {
          this.authService.checkOnlineState();
          this.shouldPopupWhenOffline = true;
        } else if (item.url.includes('/resources') || item.url.includes('/faq') || item.url.includes('/about')) {
          if (!this.online) {
            this.authService.checkOnlineState();
          }
        } else {
          this.shouldPopupWhenOffline = false;
        }
      }
    });

    this.authService.isOnline.subscribe(online => {
      this.online = online;
      if (!online && this.shouldPopupWhenOffline) {
        this.shouldPopupWhenOffline = false;
        // open modal to redirect
        this.dialog.open(OfflineDialogComponent, {
          data: null,
          hasBackdrop: true,
          disableClose: true,
          width: '450px'
        });
      } 
    })
  }

  // customEvent() {
  //   const gtmTag = {
  //     event: 'button-click',
  //     data: 'my-custom-event',
  //   };
  //   this.gtmService.pushTag(gtmTag);

  //   alert('this is a custom event');
  // }
}
