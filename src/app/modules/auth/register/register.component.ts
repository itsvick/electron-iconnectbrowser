import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [style({ transform: 'translateX(-100%)' })]),
    ]),
  ],
})
export class RegisterComponent extends AbstractBaseComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {

  }
}
