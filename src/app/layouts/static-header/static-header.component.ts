import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-static-header',
  templateUrl: './static-header.component.html',
  styleUrls: ['./static-header.component.scss']
})
export class StaticHeaderComponent implements OnInit {

  isLandingPage: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLandingPage = event.url === '/';
      }
    });

  }


  ngOnInit() {

  }
}
