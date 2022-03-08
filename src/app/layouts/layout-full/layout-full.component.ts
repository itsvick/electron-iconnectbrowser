import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-layout-full',
  templateUrl: './layout-full.component.html',
  styleUrls: ['./layout-full.component.scss']
})
export class LayoutFullComponent implements OnInit {
  $url: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private router: Router) { }

  $simpleHeader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingHeader: boolean = true;

  ngOnInit() {
    this.router.events.forEach((item) => {
      if (item instanceof NavigationEnd) {
        this.checkUrl(item.url);
      }
    });

    if (!this.$url.value) {
      this.checkUrl(this.router.url);
    }
  }

  checkUrl(url: string) {
    this.$url.next(url);
    if (url.includes('/subjects')) {
      if (url === '/subjects') {
        this.$simpleHeader.next(true);
      } else {
        this.$simpleHeader.next(false);
      }
    } else {
      this.$simpleHeader.next(true);
    }
  }

}
