import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-centered-content-layout',
  templateUrl: './centered-content-layout.component.html',
  styleUrls: ['./centered-content-layout.component.scss']
})
export class CenteredContentLayoutComponent implements OnInit {
  @Input() pageItems;

  constructor() { }

  ngOnInit() {
  }

  navigateSomewhere(id) {
    console.log('navigate to search result with id of: ', id);
  }

}
