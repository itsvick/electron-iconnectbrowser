import { Component, OnInit, Input, Optional, Self, Output, EventEmitter } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input-styled',
  templateUrl: './input-styled.component.html',
  styleUrls: ['./input-styled.component.scss']
})
export class InputStyledComponent extends AbstractBaseComponent implements OnInit {
  @Input() control: FormControl;
  @Input() title: string;
  @Input() placeholder: string;
  @Input() type: 'default' | 'password' | 'number' = 'default';
  @Input() showError: boolean = true;
  @Input() resetEnabled: boolean;
  @Input() isUpperCase: boolean;
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private router: Router
  ) {
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (!this.placeholder && this.title) {
      this.placeholder = this.isVowel(this.title[0]) ? 'Enter an ' : 'Enter a ' + this.title;
    }
  }

  forgotPassowrd() {
    this.router.navigate(['/auth/forgot-password']);
  }

  toUpperCase() {
    if(!this.isUpperCase) {
      return;
    }
    this.ngControl.control.setValue(this.ngControl.control.value.toUpperCase());
  }
  

  writeValue(): void { }
  registerOnChange(): void { }
  registerOnTouched(): void { }
  setDisabledState?(): void { }
}
