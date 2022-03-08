import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-layout',
  templateUrl: './standard-layout.component.html',
  styleUrls: ['./standard-layout.component.scss']
})
export class StandardLayoutComponent implements OnInit {
  isInChildView: boolean;

  constructor() { }

  ngOnInit() {
    this.isInChildView = true;
  }

}
