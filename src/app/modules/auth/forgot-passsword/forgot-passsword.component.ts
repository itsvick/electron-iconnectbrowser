import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@api/services/auth.service';
import { AbstractBaseComponent } from '@shared/abstracts/abstract-base-component';
import { Router } from "@angular/router";

@Component({
  selector: 'app-fogot-password',
  templateUrl: './forgot-passsword.component.html',
  styleUrls: ['./forgot-passsword.component.scss']
})
export class ForgotPasswordComponent extends AbstractBaseComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  email: string;
  phoneNumber: string;
  authenticating: boolean;

  resetWithEmail = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      phoneNumber: [null, [Validators.required, Validators.pattern(this.mobileRegex)]]
    });
  }

  trimEmail() {
    this.form.get('email').setValue((this.form.get('email').value || '').trim());
  }

  reset() {}

}
