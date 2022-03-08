import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = 2020;
  constructor() { }

  ngOnInit() {
    const now = new Date();
    this.year = now.getFullYear();
  }
}
