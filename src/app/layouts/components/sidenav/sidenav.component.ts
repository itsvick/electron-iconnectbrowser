import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "@api/services/auth.service";
import { AbstractBaseComponent } from "@shared/abstracts/abstract-base-component";
import { BehaviorSubject, Subject } from "rxjs";


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent extends AbstractBaseComponent implements OnInit {
  @Input() $url: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  navItems: any[];
  currentUrl: string;
  disabled: boolean = false;

  constructor(http: HttpClient, private authService: AuthService) { super(http)}

  ngOnInit() {
    this.authService.isOnline.subscribe(online => {
      this.disabled = !online;
    });
    this.$url.subscribe(url => {
      this.currentUrl = url;
    });

    this.navItems = [
    {
      icon: 'search',
      title: 'Browser',
      path: '/browser',
      disableOffline: true
    },
    {
      icon: 'info',
      title: 'About iCONNECT',
      path: '/about'
    },
    {
      icon: 'help',
      title: 'FAQ',
      path: '/faq'
    }];
  }
}
