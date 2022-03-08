import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.scss']
})
export class FilterSelectComponent implements OnInit {
  dropdownIsOpen = false;
  @Input() menu;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownIsOpen = false;
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  toggleItems() {
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

}
